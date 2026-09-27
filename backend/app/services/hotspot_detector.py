from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.citizen_request import CitizenRequest
from app.models.hotspot import Hotspot


class HotspotDetector:
    """
    Spatial Density & Demand Clustering Engine
    Aggregates citizen requests by geographic clusters and categories to compute hotspot severity.
    """

    def detect_and_sync_hotspots(self, db: Session) -> List[Hotspot]:
        """Aggregate citizen requests to ensure active hotspots reflect live demand"""
        # Group by state, district, category
        results = db.query(
            CitizenRequest.state,
            CitizenRequest.district,
            CitizenRequest.category,
            func.count(CitizenRequest.id).label("total"),
            func.avg(CitizenRequest.latitude).label("avg_lat"),
            func.avg(CitizenRequest.longitude).label("avg_lng"),
        ).group_by(
            CitizenRequest.state,
            CitizenRequest.district,
            CitizenRequest.category
        ).all()

        hotspots_list = []

        for row in results:
            state, district, category, total_count, avg_lat, avg_lng = row
            
            # Skip if no valid coordinates
            if not avg_lat or not avg_lng:
                avg_lat, avg_lng = 26.7997, 82.8021 # Fallback coords for UP district center

            # Calculate severity level based on volume
            if total_count >= 50:
                severity = "CRITICAL"
                demand_score = min(85.0 + (total_count * 0.2), 99.0)
            elif total_count >= 20:
                severity = "HIGH"
                demand_score = 75.0 + (total_count * 0.3)
            elif total_count >= 5:
                severity = "MODERATE"
                demand_score = 55.0 + (total_count * 0.5)
            else:
                severity = "LOW"
                demand_score = 40.0 + (total_count * 1.0)

            # Check if hotspot already exists
            existing = db.query(Hotspot).filter(
                Hotspot.state == state,
                Hotspot.district == district,
                Hotspot.category == category
            ).first()

            title = f"{district} {category} Demand Cluster"

            if existing:
                existing.total_complaints = total_count
                existing.severity_level = severity
                existing.demand_score = round(demand_score, 1)
                existing.latitude = float(avg_lat)
                existing.longitude = float(avg_lng)
                hotspots_list.append(existing)
            else:
                new_hotspot = Hotspot(
                    title=title,
                    category=category,
                    state=state,
                    district=district,
                    cluster_area=f"{district} Central & Rural Blocks",
                    latitude=float(avg_lat),
                    longitude=float(avg_lng),
                    radius_km=7.5,
                    total_complaints=total_count,
                    severity_level=severity,
                    demand_score=round(demand_score, 1),
                    status="ACTIVE"
                )
                db.add(new_hotspot)
                hotspots_list.append(new_hotspot)

        db.commit()
        return hotspots_list


hotspot_detector = HotspotDetector()
