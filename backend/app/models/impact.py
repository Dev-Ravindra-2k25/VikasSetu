import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class ImpactMetric(Base):
    __tablename__ = "impact_metrics"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    district = Column(String, index=True, nullable=False)
    state = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    
    indicator_name = Column(String, nullable=False) # e.g. "Healthcare Accessibility", "Citizen Complaints", "Average Travel Distance"
    before_value = Column(Float, nullable=False)
    after_value = Column(Float, nullable=False)
    unit = Column(String, default="%")             # %, km, complaints, hrs
    change_pct = Column(Float, nullable=False)     # e.g. +34.0, -74.1
    status = Column(String, default="MEASURED")
    notes = Column(Text, nullable=True)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="impact_metrics")
