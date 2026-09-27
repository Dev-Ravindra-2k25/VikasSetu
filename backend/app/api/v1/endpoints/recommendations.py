import uuid
import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.recommendation import Recommendation
from app.models.project import Project
from app.models.hotspot import Hotspot
from app.schemas.recommendation_schemas import (
    RecommendationResponse,
    SanctionRecommendationRequest,
)
from app.schemas.project_schemas import ProjectResponse

router = APIRouter()


@router.get("", response_model=List[RecommendationResponse])
def list_recommendations(
    district: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List AI Project Recommendations sorted by Development Priority Score (0-100)"""
    query = db.query(Recommendation)
    if district:
        query = query.filter(Recommendation.district.ilike(f"%{district}%"))
    if category:
        query = query.filter(Recommendation.category == category)
    if status:
        query = query.filter(Recommendation.status == status)

    return query.order_by(Recommendation.priority_score.desc()).all()


@router.get("/{id}", response_model=RecommendationResponse)
def get_recommendation(id: int, db: Session = Depends(get_db)):
    rec = db.query(Recommendation).filter(Recommendation.id == id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return rec


@router.post("/{id}/sanction", response_model=ProjectResponse)
def sanction_recommendation(
    id: int,
    payload: SanctionRecommendationRequest,
    db: Session = Depends(get_db)
):
    """
    Policymaker action: Sanction an AI Recommendation into an active public works project.
    Updates the recommendation status to SANCTIONED and creates a new Project record.
    """
    rec = db.query(Recommendation).filter(Recommendation.id == id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")

    rec.status = "SANCTIONED"

    # Also update associated hotspot if present
    if rec.hotspot_id:
        hotspot = db.query(Hotspot).filter(Hotspot.id == rec.hotspot_id).first()
        if hotspot:
            hotspot.status = "SANCTIONED"

    project_code = f"PRJ-{rec.district[:3].upper()}-{uuid.uuid4().hex[:6].upper()}"
    budget = payload.sanctioned_budget_inr or rec.estimated_budget_inr

    new_project = Project(
        recommendation_id=rec.id,
        project_code=project_code,
        title=rec.title,
        description=rec.recommended_intervention,
        category=rec.category,
        department=payload.department,
        district=rec.district,
        state=rec.state,
        sanctioned_budget_inr=budget,
        spent_budget_inr=0.0,
        status="IN_PROGRESS",
        progress_pct=15.0,
        start_date=datetime.datetime.utcnow(),
        expected_completion=datetime.datetime.utcnow() + datetime.timedelta(days=180)
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project
