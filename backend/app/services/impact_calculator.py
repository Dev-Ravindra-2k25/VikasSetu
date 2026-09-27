from typing import List, Dict, Any


class ImpactCalculator:
    """
    Impact Analytics & Measurement Engine
    Measures quantifiable before/after development outcomes across districts.
    """

    def calculate_improvement(self, before: float, after: float, metric_type: str = "higher_is_better") -> float:
        """
        Calculates percentage improvement.
        If higher_is_better (e.g. Accessibility %): (after - before) / before * 100
        If lower_is_better (e.g. Complaints count, Travel distance): (before - after) / before * 100
        """
        if before == 0:
            return 0.0
        
        if metric_type == "lower_is_better":
            diff = (before - after) / before * 100.0
        else:
            diff = (after - before) / before * 100.0
            
        return round(diff, 1)


impact_calculator = ImpactCalculator()
