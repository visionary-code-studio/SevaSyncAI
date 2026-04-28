from fastapi import APIRouter, HTTPException
from services.firebase_service import firebase_service
from services.vertex_service import cosine_similarity, get_embedding
from services.gemini_service import get_match_explanation
from typing import List, Dict, Any

router = APIRouter(prefix="/match", tags=["matching"])

@router.post("")
async def match_volunteers(need_id: str):
    needs = await firebase_service.get_needs()
    target_need = next((n for n in needs if n["id"] == need_id), None)
    
    if not target_need:
        raise HTTPException(status_code=404, detail="Need not found")
    
    volunteers = await firebase_service.get_volunteers(available=True)
    
    matches = []
    need_emb = target_need.get("embedding")
    if not need_emb:
        need_emb = get_embedding(f"{target_need['category']}: {target_need['description']}")

    for v in volunteers:
        v_emb = v.get("embedding")
        if not v_emb:
            v_emb = get_embedding(f"Skills: {', '.join(v['skills'])}. Zone: {', '.join(v['zones'])}")
            v["embedding"] = v_emb # Cache it for the session
            
        similarity = cosine_similarity(need_emb, v_emb)
        
        # Geoproximity bonus (mocked)
        # In real life, calculate distance between target_need['coordinates'] and v['coordinates']
        geo_bonus = 0.05 # Placeholder
        
        score = similarity + geo_bonus
        matches.append({
            "volunteer_id": v["id"],
            "name": v["name"],
            "skills": v["skills"],
            "score": min(score, 1.0),
            "similarity": similarity,
            "explanation": await get_match_explanation(target_need["description"], f"{v['name']} has skills in {', '.join(v['skills'])}")
        })
    
    # Sort by score descending
    matches.sort(key=lambda x: x["score"], reverse=True)
    
    return {
        "need_id": need_id,
        "matches": matches[:5] # Top 5
    }
