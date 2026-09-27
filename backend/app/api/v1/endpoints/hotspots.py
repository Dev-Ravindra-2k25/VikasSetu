from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.hotspot import Hotspot
from app.models.citizen_request import CitizenRequest
from app.schemas.hotspot_schemas import HotspotResponse
from app.services.hotspot_detector import hotspot_detector

router = APIRouter()


@router.get("", response_model=List[HotspotResponse])
def get_hotspots(
    category: Optional[str] = None,
    district: Optional[str] = None,
    severity: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve demand hotspots with optional filtering by category, district, or severity"""
    query = db.query(Hotspot)
    if category:
        query = query.filter(Hotspot.category == category)
    if district:
        query = query.filter(Hotspot.district.ilike(f"%{district}%"))
    if severity:
        query = query.filter(Hotspot.severity_level == severity.upper())

    return query.order_by(Hotspot.demand_score.desc()).all()


@router.get("/{id}", response_model=HotspotResponse)
def get_hotspot_detail(id: int, db: Session = Depends(get_db)):
    """Get single hotspot detail with statistics"""
    hotspot = db.query(Hotspot).filter(Hotspot.id == id).first()
    if not hotspot:
        raise HTTPException(status_code=404, detail="Hotspot not found")
    return hotspot


@router.post("/sync")
def trigger_hotspot_sync(db: Session = Depends(get_db)):
    """Force re-clustering of citizen requests into updated hotspots"""
    hotspots = hotspot_detector.detect_and_sync_hotspots(db)
    return {"message": "Hotspots synchronized successfully", "count": len(hotspots)}
