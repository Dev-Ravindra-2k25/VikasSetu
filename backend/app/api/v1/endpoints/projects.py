from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.project import Project
from app.schemas.project_schemas import ProjectResponse, ProjectUpdate

router = APIRouter()


@router.get("", response_model=List[ProjectResponse])
def list_projects(
    district: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    if district:
        query = query.filter(Project.district.ilike(f"%{district}%"))
    if category:
        query = query.filter(Project.category == category)
    if status:
        query = query.filter(Project.status == status)

    return query.order_by(Project.start_date.desc()).all()


@router.patch("/{id}", response_model=ProjectResponse)
def update_project(
    id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db)
):
    proj = db.query(Project).filter(Project.id == id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")

    if payload.status:
        proj.status = payload.status
    if payload.progress_pct is not None:
        proj.progress_pct = payload.progress_pct
    if payload.spent_budget_inr is not None:
        proj.spent_budget_inr = payload.spent_budget_inr

    db.commit()
    db.refresh(proj)
    return proj
