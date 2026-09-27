import datetime
from typing import Optional
from pydantic import BaseModel


class ImpactMetricResponse(BaseModel):
    id: int
    project_id: Optional[int]
    district: str
    state: str
    category: str
    indicator_name: str
    before_value: float
    after_value: float
    unit: str
    change_pct: float
    status: str
    notes: Optional[str]
    recorded_at: datetime.datetime

    class Config:
        from_attributes = True


class DistrictImpactOverview(BaseModel):
    district: str
    state: str
    category: str
    metrics: list[ImpactMetricResponse]
    overall_improvement_score: float
