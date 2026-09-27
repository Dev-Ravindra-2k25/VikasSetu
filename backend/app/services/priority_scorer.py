from typing import Dict, Any


class PriorityScorer:
    """
    Implements the PRD 5-Factor Weighted Development Priority Score (0-100):
    1. Citizen Demand: 35%
    2. Infrastructure Gap: 25%
    3. Population Impact: 20%
    4. Demographic Need: 10%
    5. Existing Investment Deficit: 10%
    """

    def calculate_priority(
        self,
        demand_intensity: float,      # 0 to 100 (based on complaint density/volume)
        infrastructure_gap: float,    # 0 to 100 (calculated deficiency score)
        population_impact: float,     # 0 to 100 (affected population scaled)
        demographic_need: float,      # 0 to 100 (rural %, vulnerability index)
        investment_deficit: float,    # 0 to 100 (unfunded or neglected area)
    ) -> Dict[str, Any]:
        
        # Normalize and apply factor weights
        w_demand = (min(max(demand_intensity, 0), 100) / 100.0) * 35.0
        w_gap = (min(max(infrastructure_gap, 0), 100) / 100.0) * 25.0
        w_pop = (min(max(population_impact, 0), 100) / 100.0) * 20.0
        w_demo = (min(max(demographic_need, 0), 100) / 100.0) * 10.0
        w_invest = (min(max(investment_deficit, 0), 100) / 100.0) * 10.0

        total_score = round(w_demand + w_gap + w_pop + w_demo + w_invest, 1)

        if total_score >= 85.0:
            status = "CRITICAL PRIORITY"
            color = "rose"
        elif total_score >= 70.0:
            status = "HIGH PRIORITY"
            color = "orange"
        elif total_score >= 50.0:
            status = "MODERATE PRIORITY"
            color = "amber"
        else:
            status = "LOW PRIORITY"
            color = "emerald"

        # Generate explainable reasoning (PRD Section 8.8 & 10)
        reasons = []
        if w_demand >= 25.0:
            reasons.append("High citizen complaint volume signaling urgent community outcry")
        if w_gap >= 18.0:
            reasons.append("Acute deficit in baseline infrastructure coverage and access distance")
        if w_pop >= 14.0:
            reasons.append("Large affected population count in immediate vicinity")
        if w_demo >= 7.0:
            reasons.append("High rural dependency and socio-economic vulnerability index")
        if w_invest >= 7.0:
            reasons.append("Absence of recent sanctioned capital expenditure or ongoing schemes")

        narrative = " + ".join(reasons) if reasons else "Standard community infrastructure demand"

        return {
            "priority_score": total_score,
            "status": status,
            "color": color,
            "breakdown": {
                "citizen_demand": round(w_demand, 1),
                "infrastructure_gap": round(w_gap, 1),
                "population_impact": round(w_pop, 1),
                "demographic_need": round(w_demo, 1),
                "investment_deficit": round(w_invest, 1),
            },
            "explainable_reason": narrative,
        }


priority_scorer = PriorityScorer()
