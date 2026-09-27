import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    hotspot_id = Column(Integer, ForeignKey("hotspots.id"), nullable=True)
    
    district = Column(String, index=True, nullable=False)
    state = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    title = Column(String, nullable=False)
    problem_summary = Column(Text, nullable=False)
    recommended_intervention = Column(Text, nullable=False)
    
    # Priority Score: 0-100
    priority_score = Column(Float, nullable=False)
    priority_status = Column(String, default="CRITICAL PRIORITY")  # CRITICAL PRIORITY, HIGH PRIORITY, MODERATE PRIORITY, LOW PRIORITY
    
    # Transparent scoring breakdown (PRD Section 8.7)
    citizen_demand_score = Column(Float, default=35.0)     # up to 35
    infrastructure_gap_score = Column(Float, default=25.0) # up to 25
    population_impact_score = Column(Float, default=20.0)  # up to 20
    demographic_need_score = Column(Float, default=10.0)   # up to 10
    investment_deficit_score = Column(Float, default=10.0) # up to 10
    
    # Beneficiary and financial estimates
    affected_population = Column(Integer, default=50000)
    expected_beneficiaries = Column(String, default="High (~1.8 lakh citizens)")
    estimated_budget_inr = Column(Float, default=15000000.0)  # INR (e.g. 1.5 Crore)
    
    # Lifecycle status: PROPOSED, UNDER_REVIEW, SANCTIONED, REJECTED
    status = Column(String, default="PROPOSED", index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    hotspot = relationship("Hotspot", back_populates="recommendations")
    projects = relationship("Project", back_populates="recommendation")
