import datetime
from typing import Optional, List
from pydantic import BaseModel


class HotspotBase(BaseModel):
    title: str
    category: str
    state: str
    district: str
    cluster_area: Optional[str] = None
    latitude: float
    longitude: float
    radius_km: float = 5.0
    total_complaints: int = 1
    severity_level: str = "HIGH"
    demand_score: float = 75.0
    status: str = "ACTIVE"


class HotspotResponse(HotspotBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True
