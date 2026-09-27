import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Infrastructure(Base):
    __tablename__ = "infrastructures"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    category = Column(String, index=True, nullable=False)  # Roads, Water, Healthcare, Education, Electricity, Internet
    facility_count = Column(Integer, default=0)
    access_distance_km = Column(Float, default=5.0)  # average distance in km
    coverage_pct = Column(Float, default=50.0)      # % of area or population covered
    gap_score = Column(Float, default=50.0)         # 0 (no gap) to 100 (critical deficit)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

    location = relationship("Location", back_populates="infrastructures")
