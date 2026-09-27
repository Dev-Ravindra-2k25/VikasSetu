from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.infrastructure import Infrastructure
from app.models.location import Location

router = APIRouter()


@router.get("")
def get_infrastructure_data(
    district: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve infrastructure gap data and indicators by district and category"""
    query = db.query(Infrastructure).join(Location)
    if district:
        query = query.filter(Location.district.ilike(f"%{district}%"))
    if category:
        query = query.filter(Infrastructure.category == category)

    results = []
    for item in query.all():
        results.append({
            "id": item.id,
            "district": item.location.district,
            "state": item.location.state,
            "population": item.location.population,
            "rural_percentage": item.location.rural_percentage,
            "category": item.category,
            "facility_count": item.facility_count,
            "access_distance_km": item.access_distance_km,
            "coverage_pct": item.coverage_pct,
            "gap_score": item.gap_score,
            "gap_status": "CRITICAL" if item.gap_score >= 70 else ("HIGH" if item.gap_score >= 50 else "MODERATE")
        })

    return results
