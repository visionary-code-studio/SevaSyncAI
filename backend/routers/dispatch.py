from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/dispatch", tags=["dispatch"])

@router.post("")
async def dispatch_volunteer(data: Dict[str, Any]):
    # In production, this would send an SMS/Notification
    need_id = data.get("need_id")
    volunteer_id = data.get("volunteer_id")
    
    return {
        "status": "dispatched",
        "message": f"Volunteer {volunteer_id} has been dispatched to need {need_id}.",
        "sms_preview": f"ALERT: Urgent need in your area. Your skills match. Tap to accept: https://sevasync.ai/t/{need_id}"
    }
