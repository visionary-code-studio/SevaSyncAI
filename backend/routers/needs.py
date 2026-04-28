from fastapi import APIRouter, HTTPException
from services.firebase_service import firebase_service
from typing import List, Optional

router = APIRouter(prefix="/needs", tags=["needs"])

@router.get("")
async def get_needs(category: Optional[str] = None):
    return await firebase_service.get_needs(category)

@router.patch("/{need_id}")
async def update_need_status(need_id: str, status: str):
    # For prototype, we'll just mock the update or implement it in firebase_service
    # Let's keep it simple for now
    return {"status": "updated", "need_id": need_id, "new_status": status}
