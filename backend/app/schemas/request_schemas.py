import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class CitizenRequestCreate(BaseModel):
    title: Optional[str] = None
    description: str = Field(..., description="Unstructured or structured problem statement from citizen")
    raw_text: Optional[str] = None
    audio_url: Optional[str] = None
    language: Optional[str] = "auto"
    input_type: Optional[str] = "text"  # voice, text, messaging
    category: Optional[str] = None      # Optional if auto-classified by AI
    state: str = "Uttar Pradesh"
    district: str = "Basti"
    village_town: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None


class CitizenRequestResponse(BaseModel):
    id: int
    request_uid: str
    title: Optional[str]
    description: str
    raw_text: Optional[str]
    language: str
    input_type: str
    category: str
    state: str
    district: str
    village_town: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    image_url: Optional[str]
    ai_category: Optional[str]
    ai_problem_summary: Optional[str]
    ai_sentiment: Optional[str]
    ai_urgency: Optional[str]
    ai_confidence: Optional[float]
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class AITriageResult(BaseModel):
    detected_language: str
    category: str
    problem_summary: str
    urgency: str
    sentiment: str
    confidence: float
    entities: dict
    recommended_priority_score: float
