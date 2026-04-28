from fastapi import APIRouter, UploadFile, File, HTTPException
from services.gemini_service import process_survey_image
from services.firebase_service import firebase_service
from services.vertex_service import get_embedding
from datetime import datetime

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("")
async def upload_survey(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported.")
    
    try:
        content = await file.read()
        extracted_data = await process_survey_image(content)
        
        # Add metadata and prepare for Firestore
        needs_added = []
        for item in extracted_data.get("needs", []):
            need_entry = {
                "location": extracted_data.get("location", "Unknown"),
                "coordinates": {"lat": 19.0760, "lng": 72.8777}, # Default/Mock coords
                "category": item.get("category", "other"),
                "description": item.get("description", ""),
                "urgency": item.get("urgency", 5.0),
                "affected_count": item.get("affected_count", 0),
                "contact": item.get("contact", ""),
                "status": "open",
                "created_at": datetime.now().isoformat(),
            }
            
            # Generate embedding for future matching
            embedding_text = f"{need_entry['category']}: {need_entry['description']}. Location: {need_entry['location']}."
            need_entry["embedding"] = get_embedding(embedding_text)
            
            need_id = await firebase_service.create_need(need_entry)
            needs_added.append(need_id)
            
        return {
            "status": "success",
            "needs_ids": needs_added,
            "extracted_data": extracted_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
