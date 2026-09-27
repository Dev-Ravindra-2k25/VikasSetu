import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, index=True, nullable=False)
    district = Column(String, index=True, nullable=False)
    sub_district = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    population = Column(Integer, default=100000)
    population_density = Column(Float, default=450.0)  # people per sq km
    rural_percentage = Column(Float, default=70.0)    # %
    vulnerability_index = Column(Float, default=0.5)  # 0 to 1
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    infrastructures = relationship("Infrastructure", back_populates="location")
    requests = relationship("CitizenRequest", back_populates="location")
