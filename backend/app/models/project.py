import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    recommendation_id = Column(Integer, ForeignKey("recommendations.id"), nullable=True)
    project_code = Column(String, unique=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, index=True, nullable=False)
    department = Column(String, nullable=False)  # Public Works, Health, Jal Shakti, Education, etc.
    district = Column(String, index=True, nullable=False)
    state = Column(String, index=True, nullable=False)
    
    sanctioned_budget_inr = Column(Float, default=10000000.0)
    spent_budget_inr = Column(Float, default=0.0)
    
    # Status: PLANNING, TENDER_ISSUED, IN_PROGRESS, COMPLETED
    status = Column(String, default="PLANNING", index=True)
    progress_pct = Column(Float, default=0.0)
    
    start_date = Column(DateTime, default=datetime.datetime.utcnow)
    expected_completion = Column(DateTime, nullable=True)
    actual_completion = Column(DateTime, nullable=True)

    # Relationships
    recommendation = relationship("Recommendation", back_populates="projects")
    impact_metrics = relationship("ImpactMetric", back_populates="project")
