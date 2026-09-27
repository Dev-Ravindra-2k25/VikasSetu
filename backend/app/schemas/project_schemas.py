import datetime
from typing import Optional
from pydantic import BaseModel


class ProjectResponse(BaseModel):
    id: int
    recommendation_id: Optional[int]
    project_code: str
    title: str
    description: Optional[str]
    category: str
    department: str
    district: str
    state: str
    sanctioned_budget_inr: float
    spent_budget_inr: float
    status: str
    progress_pct: float
    start_date: datetime.datetime
    expected_completion: Optional[datetime.datetime]
    actual_completion: Optional[datetime.datetime]

    class Config:
        from_attributes = True


class ProjectUpdate(BaseModel):
    status: Optional[str] = None
    progress_pct: Optional[float] = None
    spent_budget_inr: Optional[float] = None
