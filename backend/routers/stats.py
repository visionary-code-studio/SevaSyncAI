from fastapi import APIRouter

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("")
async def get_stats():
    # In production, calculate these from Firestore
    return {
        "needs_resolved": 1245,
        "active_volunteers": 842,
        "avg_response_time": "1.2h",
        "category_breakdown": [
            {"name": "Food", "value": 400},
            {"name": "Water", "value": 300},
            {"name": "Medical", "value": 300},
            {"name": "Shelter", "value": 200}
        ]
    }
