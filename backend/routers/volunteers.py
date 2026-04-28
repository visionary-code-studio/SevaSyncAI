from fastapi import APIRouter
from services.firebase_service import firebase_service
from services.vertex_service import get_embedding
from typing import List, Dict, Any

router = APIRouter(prefix="/volunteers", tags=["volunteers"])

@router.get("")
async def get_volunteers():
    return await firebase_service.get_volunteers()

@router.post("")
async def register_volunteer(volunteer: Dict[str, Any]):
    # Generate embedding for the new volunteer
    skills_text = f"Skills: {', '.join(volunteer.get('skills', []))}. Zones: {', '.join(volunteer.get('zones', []))}"
    volunteer["embedding"] = get_embedding(skills_text)
    
    v_id = await firebase_service.add_volunteer(volunteer)
    return {"status": "success", "volunteer_id": v_id}
