import datetime
from typing import Optional
from pydantic import BaseModel


class ScoreBreakdown(BaseModel):
    citizen_demand: float        # up to 35%
    infrastructure_gap: float    # up to 25%
    population_impact: float     # up to 20%
    demographic_need: float      # up to 10%
    investment_deficit: float    # up to 10%
    total_priority_score: float  # sum (0-100)


class RecommendationResponse(BaseModel):
    id: int
    hotspot_id: Optional[int]
    district: str
    state: str
    category: str
    title: str
    problem_summary: str
    recommended_intervention: str
    priority_score: float
    priority_status: str
    citizen_demand_score: float
    infrastructure_gap_score: float
    population_impact_score: float
    demographic_need_score: float
    investment_deficit_score: float
    affected_population: int
    expected_beneficiaries: str
    estimated_budget_inr: float
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class SanctionRecommendationRequest(BaseModel):
    department: str = "Public Works Department"
    sanctioned_budget_inr: Optional[float] = None
    notes: Optional[str] = None
