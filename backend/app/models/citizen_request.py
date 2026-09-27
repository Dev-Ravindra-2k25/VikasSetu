import datetime
import uuid
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


def generate_request_uid():
    return f"VS-{uuid.uuid4().hex[:8].upper()}"


class CitizenRequest(Base):
    __tablename__ = "citizen_requests"

    id = Column(Integer, primary_key=True, index=True)
    request_uid = Column(String, unique=True, index=True, default=generate_request_uid)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    anonymous_id = Column(String, nullable=True)
    
    # Input content
    title = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    raw_text = Column(Text, nullable=True)
    audio_url = Column(String, nullable=True)
    language = Column(String, default="hi")  # hi, en, bn, ta, te, etc.
    input_type = Column(String, default="text")  # voice, text, messaging
    category = Column(String, index=True, nullable=False)  # Roads, Water, Healthcare, Education, Electricity, Internet, etc.
    
    # Geographic location
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    state = Column(String, index=True, nullable=False)
    district = Column(String, index=True, nullable=False)
    village_town = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Media & attachments
    image_url = Column(String, nullable=True)
    
    # AI Extraction & Triage metadata
    ai_category = Column(String, nullable=True)
    ai_problem_summary = Column(String, nullable=True)
    ai_sentiment = Column(String, default="negative")
    ai_urgency = Column(String, default="HIGH")  # LOW, MODERATE, HIGH, CRITICAL
    ai_confidence = Column(Float, default=0.88)
    
    # Lifecycle status
    # SUBMITTED -> TRIAGED -> IN_HOTSPOT -> UNDER_REVIEW -> SANCTIONED -> RESOLVED
    status = Column(String, default="SUBMITTED", index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    location = relationship("Location", back_populates="requests")
