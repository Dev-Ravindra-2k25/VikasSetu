from typing import List, Dict, Any
from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_citizen_requests: int
    active_hotspots_count: int
    critical_hotspots_count: int
    ai_recommendations_count: int
    active_projects_count: int
    total_budget_allocated_inr: float
    beneficiaries_reached: int
    average_impact_improvement_pct: float
    category_breakdown: Dict[str, int]
    top_districts: List[Dict[str, Any]]
    recent_activity: List[Dict[str, Any]]
