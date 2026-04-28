from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class NeedDetail(BaseModel):
    category: str
    description: str
    urgency: float
    affected_count: int
    contact: Optional[str] = None

class Need(BaseModel):
    id: Optional[str] = None
    location: str
    coordinates: Dict[str, float]
    category: str
    description: str
    urgency: float
    affected_count: int
    contact: Optional[str] = None
    status: str = "open"
    created_at: Optional[datetime] = None
    source_image_url: Optional[str] = None

class Volunteer(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str
    email: str
    skills: List[str]
    languages: List[str]
    zones: List[str]
    coordinates: Dict[str, float]
    available: bool = True
    reliability_score: float = 5.0
    total_tasks: int = 0
    created_at: Optional[datetime] = None

class Assignment(BaseModel):
    id: Optional[str] = None
    need_id: str
    volunteer_id: str
    status: str = "dispatched"
    dispatched_at: datetime
    accepted_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    notes: Optional[str] = None
