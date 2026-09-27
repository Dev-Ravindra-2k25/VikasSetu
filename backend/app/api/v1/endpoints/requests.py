from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.citizen_request import CitizenRequest
from app.models.location import Location
from app.schemas.request_schemas import (
    CitizenRequestCreate,
    CitizenRequestResponse,
    AITriageResult,
)
from app.services.ai_nlp_engine import ai_nlp_engine
from app.services.hotspot_detector import hotspot_detector

router = APIRouter()


@router.post("", response_model=CitizenRequestResponse)
def submit_citizen_request(
    payload: CitizenRequestCreate,
    db: Session = Depends(get_db)
):
    """
    Submit a citizen development request via text or voice transcription.
    Automatically executes the AI NLP pipeline:
    - Detects language (Hindi / English)
    - Classifies development category
    - Assesses problem urgency & sentiment
    - Updates local demand hotspot tracking
    """
    # Run AI Triage
    triage = ai_nlp_engine.triage_request(
        text=payload.description,
        district=payload.district,
        category_hint=payload.category
    )

    detected_lang = triage["detected_language"] if payload.language == "auto" else payload.language
    category = triage["category"]

    # Match Location if coordinates are missing
    lat = payload.latitude
    lng = payload.longitude
    loc = db.query(Location).filter(
        Location.district == payload.district
    ).first()
    
    if loc and (lat is None or lng is None):
        # Slightly jitter around district center for realism
        import random
        lat = loc.latitude + (random.uniform(-0.04, 0.04))
        lng = loc.longitude + (random.uniform(-0.04, 0.04))

    # Create request
    new_req = CitizenRequest(
        title=payload.title or f"{category} Issue in {payload.district}",
        description=payload.description,
        raw_text=payload.raw_text or payload.description,
        audio_url=payload.audio_url,
        language=detected_lang,
        input_type=payload.input_type or "text",
        category=category,
        location_id=loc.id if loc else None,
        state=payload.state,
        district=payload.district,
        village_town=payload.village_town or (triage["entities"].get("village_or_ward") if triage.get("entities") else None),
        latitude=lat,
        longitude=lng,
        image_url=payload.image_url,
        ai_category=category,
        ai_problem_summary=triage["problem_summary"],
        ai_sentiment=triage["sentiment"],
        ai_urgency=triage["urgency"],
        ai_confidence=triage["confidence"],
        status="TRIAGED"
    )

    db.add(new_req)
    db.commit()
    db.refresh(new_req)

    # Sync hotspots in background
    try:
        hotspot_detector.detect_and_sync_hotspots(db)
    except Exception:
        pass

    return new_req


@router.post("/triage-preview", response_model=AITriageResult)
def preview_ai_triage(
    text: str = Query(..., description="Problem statement to preview"),
    district: str = Query("Basti", description="District name"),
    category: Optional[str] = Query(None, description="Optional manual category")
):
    """Real-time instant AI triage preview without saving to database"""
    result = ai_nlp_engine.triage_request(text=text, district=district, category_hint=category)
    return result


@router.get("", response_model=List[CitizenRequestResponse])
def list_citizen_requests(
    district: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Retrieve citizen requests with optional district, category, and status filters"""
    query = db.query(CitizenRequest)
    if district:
        query = query.filter(CitizenRequest.district.ilike(f"%{district}%"))
    if category:
        query = query.filter(CitizenRequest.category == category)
    if status:
        query = query.filter(CitizenRequest.status == status)

    return query.order_by(CitizenRequest.created_at.desc()).offset(offset).limit(limit).all()


@router.get("/{id_or_uid}", response_model=CitizenRequestResponse)
def get_citizen_request(id_or_uid: str, db: Session = Depends(get_db)):
    """Retrieve a specific request by ID or tracking UID (e.g., VS-A1B2C3D4)"""
    if id_or_uid.isdigit():
        req = db.query(CitizenRequest).filter(CitizenRequest.id == int(id_or_uid)).first()
    else:
        req = db.query(CitizenRequest).filter(CitizenRequest.request_uid == id_or_uid).first()

    if not req:
        raise HTTPException(status_code=404, detail="Citizen request not found")
    return req
