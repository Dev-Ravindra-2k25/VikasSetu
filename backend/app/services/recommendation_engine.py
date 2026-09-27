from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.hotspot import Hotspot
from app.models.infrastructure import Infrastructure
from app.models.location import Location
from app.models.recommendation import Recommendation
from app.services.priority_scorer import priority_scorer


class RecommendationEngine:
    """
    AI Project Recommendation Engine
    Converts citizen demand hotspots, infrastructure deficit indicators,
    and demographic need into explainable, prioritized public works recommendations.
    """

    ACTION_TEMPLATES = {
        "Roads & Transport": "Upgrade and widen key rural connectivity corridor with asphalt paving, stormwater drainage, and culvert reinforcement.",
        "Water & Sanitation": "Deploy Jal Jeevan Mission piped water supply network, overhead water storage reservoirs, and deep borewells with solar pumping.",
        "Healthcare": "Establish a 24x7 Community Health Centre (CHC) with emergency trauma care, maternal ward, and diagnostic laboratory.",
        "Education": "Modernize government primary & composite schools with digital smart classrooms, science labs, and gender-segregated sanitation facilities.",
        "Electricity": "Install high-capacity distribution transformers, replace damaged overhead cabling, and install feeder separation for uninterrupted agricultural & domestic supply.",
        "Internet & Digital Connectivity": "Erect BharatNet fiber optical point-of-presence (PoP) and 4G/5G telecom tower infrastructure for rural coverage.",
        "Drainage & Waste Management": "Construct closed pucca drainage network with decentralized solid & liquid waste treatment processing facility.",
    }

    def generate_recommendation_for_hotspot(self, hotspot: Hotspot, db: Session) -> Recommendation:
        """Calculate multi-factor priority score and format actionable proposal"""
        # Find matching location
        location = db.query(Location).filter(
            Location.state == hotspot.state,
            Location.district == hotspot.district
        ).first()

        pop = location.population if location else 180000
        rural_pct = location.rural_percentage if location else 78.0
        vuln = location.vulnerability_index if location else 0.65

        # Find matching infrastructure gap
        infra = None
        if location:
            infra = db.query(Infrastructure).filter(
                Infrastructure.location_id == location.id,
                Infrastructure.category == hotspot.category
            ).first()

        gap_score = infra.gap_score if infra else 68.0

        # Calculate factors:
        # 1. Demand intensity (0-100)
        demand_intensity = min(hotspot.demand_score, 100.0)
        # 2. Infra gap (0-100)
        # 3. Pop impact (scaled relative to 300,000 baseline)
        pop_impact = min((pop / 300000.0) * 100.0, 100.0)
        # 4. Demographic need (rural % and vuln index)
        demo_need = (rural_pct * 0.6) + (vuln * 100.0 * 0.4)
        # 5. Investment deficit (assume high deficit for critical gaps)
        invest_deficit = max(gap_score * 0.9, 40.0)

        score_result = priority_scorer.calculate_priority(
            demand_intensity=demand_intensity,
            infrastructure_gap=gap_score,
            population_impact=pop_impact,
            demographic_need=demo_need,
            investment_deficit=invest_deficit,
        )

        title = f"{hotspot.district} {hotspot.category} Infrastructure Intervention"
        problem_summary = f"Severe citizen distress recorded ({hotspot.total_complaints} verified reports) regarding {hotspot.category.lower()} deficiency in {hotspot.district}."
        action = self.ACTION_TEMPLATES.get(
            hotspot.category, 
            f"Comprehensive capital improvement and infrastructure expansion for {hotspot.category.lower()} in {hotspot.district}."
        )

        beneficiaries_label = f"High (~{int(pop * 0.75):,} residents across rural & urban blocks)"
        budget_estimate = 12000000.0 if hotspot.category in ["Water & Sanitation", "Electricity"] else 25000000.0

        breakdown = score_result["breakdown"]

        rec = Recommendation(
            hotspot_id=hotspot.id,
            district=hotspot.district,
            state=hotspot.state,
            category=hotspot.category,
            title=title,
            problem_summary=problem_summary,
            recommended_intervention=action,
            priority_score=score_result["priority_score"],
            priority_status=score_result["status"],
            citizen_demand_score=breakdown["citizen_demand"],
            infrastructure_gap_score=breakdown["infrastructure_gap"],
            population_impact_score=breakdown["population_impact"],
            demographic_need_score=breakdown["demographic_need"],
            investment_deficit_score=breakdown["investment_deficit"],
            affected_population=pop,
            expected_beneficiaries=beneficiaries_label,
            estimated_budget_inr=budget_estimate,
            status="PROPOSED"
        )
        return rec


recommendation_engine = RecommendationEngine()
