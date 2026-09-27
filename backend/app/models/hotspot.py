import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Hotspot(Base):
    __tablename__ = "hotspots"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, index=True, nullable=False)
    state = Column(String, index=True, nullable=False)
    district = Column(String, index=True, nullable=False)
    cluster_area = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    radius_km = Column(Float, default=5.0)
    
    # Aggregated metrics
    total_complaints = Column(Integer, default=1)
    severity_level = Column(String, default="HIGH")  # LOW, MODERATE, HIGH, CRITICAL
    demand_score = Column(Float, default=75.0)       # 0 to 100
    
    status = Column(String, default="ACTIVE")        # ACTIVE, INVESTIGATING, SANCTIONED, RESOLVED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    recommendations = relationship("Recommendation", back_populates="hotspot")
