import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.user import User
from app.models.location import Location
from app.models.infrastructure import Infrastructure
from app.models.citizen_request import CitizenRequest
from app.models.hotspot import Hotspot
from app.models.recommendation import Recommendation
from app.models.project import Project
from app.models.impact import ImpactMetric


def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Location).first():
            print("Database already contains data, skipping seed.")
            return

        print("Seeding VikasSetu database with rich civic-tech data...")

        # 1. Users
        users = [
            User(
                email="official@vikassetu.gov.in",
                hashed_password=get_password_hash("official123"),
                full_name="Rajesh Sharma (District Magistrate / Policy Lead)",
                role="official",
            ),
            User(
                email="citizen@vikassetu.gov.in",
                hashed_password=get_password_hash("citizen123"),
                full_name="Amit Kumar (Citizen Representative)",
                role="citizen",
            ),
            User(
                email="admin@vikassetu.gov.in",
                hashed_password=get_password_hash("admin123"),
                full_name="VikasSetu System Administrator",
                role="admin",
            ),
        ]
        db.add_all(users)
        db.commit()

        # 2. Locations (Indian Districts)
        locations_data = [
            {
                "state": "Uttar Pradesh",
                "district": "Basti",
                "sub_district": "Harraiya / Basti Sadar",
                "latitude": 26.7997,
                "longitude": 82.8021,
                "population": 240000,
                "population_density": 830.0,
                "rural_percentage": 88.5,
                "vulnerability_index": 0.72,
            },
            {
                "state": "Uttar Pradesh",
                "district": "Gorakhpur",
                "sub_district": "Campierganj / Sahjanwa",
                "latitude": 26.7606,
                "longitude": 83.3732,
                "population": 444000,
                "population_density": 1330.0,
                "rural_percentage": 76.2,
                "vulnerability_index": 0.61,
            },
            {
                "state": "Uttar Pradesh",
                "district": "Varanasi",
                "sub_district": "Pindra / Sewapuri",
                "latitude": 25.3176,
                "longitude": 82.9739,
                "population": 367000,
                "population_density": 1720.0,
                "rural_percentage": 58.4,
                "vulnerability_index": 0.48,
            },
            {
                "state": "Uttar Pradesh",
                "district": "Sambhal",
                "sub_district": "Chandausi / Gunnaur",
                "latitude": 28.5847,
                "longitude": 78.5714,
                "population": 219000,
                "population_density": 890.0,
                "rural_percentage": 82.0,
                "vulnerability_index": 0.69,
            },
            {
                "state": "Uttar Pradesh",
                "district": "Sitapur",
                "sub_district": "Biswan / Laharpur",
                "latitude": 27.5683,
                "longitude": 80.6829,
                "population": 310000,
                "population_density": 770.0,
                "rural_percentage": 89.0,
                "vulnerability_index": 0.76,
            },
        ]

        locations = []
        for loc in locations_data:
            l = Location(**loc)
            db.add(l)
            locations.append(l)
        db.commit()

        # 3. Infrastructure Gap Indicators
        infra_items = [
            # Basti (PRD Section 8.6 Benchmark)
            Infrastructure(
                location_id=locations[0].id,
                category="Healthcare",
                facility_count=2,
                access_distance_km=15.0,
                coverage_pct=41.0,
                gap_score=88.0,
            ),
            Infrastructure(
                location_id=locations[0].id,
                category="Roads & Transport",
                facility_count=48,
                access_distance_km=6.5,
                coverage_pct=52.0,
                gap_score=78.0,
            ),
            Infrastructure(
                location_id=locations[0].id,
                category="Water & Sanitation",
                facility_count=18,
                access_distance_km=3.2,
                coverage_pct=46.0,
                gap_score=74.0,
            ),
            # Gorakhpur
            Infrastructure(
                location_id=locations[1].id,
                category="Water & Sanitation",
                facility_count=35,
                access_distance_km=2.8,
                coverage_pct=38.0,
                gap_score=82.0,
            ),
            Infrastructure(
                location_id=locations[1].id,
                category="Roads & Transport",
                facility_count=92,
                access_distance_km=4.2,
                coverage_pct=64.0,
                gap_score=62.0,
            ),
            # Varanasi
            Infrastructure(
                location_id=locations[2].id,
                category="Drainage & Waste Management",
                facility_count=14,
                access_distance_km=4.8,
                coverage_pct=55.0,
                gap_score=68.0,
            ),
            Infrastructure(
                location_id=locations[2].id,
                category="Roads & Transport",
                facility_count=120,
                access_distance_km=2.1,
                coverage_pct=72.0,
                gap_score=54.0,
            ),
        ]
        db.add_all(infra_items)
        db.commit()

        # 4. Citizen Requests (Authentic Multilingual voice & text reports)
        requests_data = [
            {
                "request_uid": "VS-BST-8421",
                "title": "Severe road cutoff in Harraiya rural sector",
                "description": "हमारे गांव में सड़क बहुत खराब है और बारिश में पूरा रास्ता बंद हो जाता है।",
                "raw_text": "हमारे गांव में सड़क बहुत खराब है और बारिश में पूरा रास्ता बंद हो जाता है।",
                "language": "hi",
                "input_type": "voice",
                "category": "Roads & Transport",
                "location_id": locations[0].id,
                "state": "Uttar Pradesh",
                "district": "Basti",
                "village_town": "Vikramjot Block",
                "latitude": 26.8120,
                "longitude": 82.7845,
                "ai_category": "Roads & Transport",
                "ai_problem_summary": "Unpaved road damaged by monsoon causing complete rural access block",
                "ai_urgency": "HIGH",
                "ai_confidence": 0.94,
                "status": "IN_HOTSPOT",
            },
            {
                "request_uid": "VS-BST-3810",
                "title": "Hospital emergency distance crisis",
                "description": "हमारे गांव में अस्पताल बहुत दूर है। मरीज को ले जाते समय रास्ते में ही हालत बिगड़ जाती है।",
                "raw_text": "हमारे गांव में अस्पताल बहुत दूर है।",
                "language": "hi",
                "input_type": "voice",
                "category": "Healthcare",
                "location_id": locations[0].id,
                "state": "Uttar Pradesh",
                "district": "Basti",
                "village_town": "Kaptanganj",
                "latitude": 26.7850,
                "longitude": 82.8120,
                "ai_category": "Healthcare",
                "ai_problem_summary": "Lack of accessible PHC/CHC within 15km causing medical emergencies",
                "ai_urgency": "CRITICAL",
                "ai_confidence": 0.96,
                "status": "SANCTIONED",
            },
            {
                "request_uid": "VS-GKP-6210",
                "title": "Contaminated groundwater and broken pipeline",
                "description": "पीने के पानी का नल 3 महीने से सूखा पड़ा है, 4 किलोमीटर दूर से पानी लाना पड़ता है। गंदे पानी से बच्चे बीमार हो रहे हैं।",
                "raw_text": "पीने के पानी का नल 3 महीने से सूखा पड़ा है...",
                "language": "hi",
                "input_type": "text",
                "category": "Water & Sanitation",
                "location_id": locations[1].id,
                "state": "Uttar Pradesh",
                "district": "Gorakhpur",
                "village_town": "Bansgaon Ward 4",
                "latitude": 26.7450,
                "longitude": 83.3510,
                "ai_category": "Water & Sanitation",
                "ai_problem_summary": "Piped drinking water breakdown forcing 4km haul and causing waterborne illness",
                "ai_urgency": "CRITICAL",
                "ai_confidence": 0.97,
                "status": "SANCTIONED",
            },
            {
                "request_uid": "VS-VAR-2940",
                "title": "Primary school building dilapidated with leaking ceiling",
                "description": "प्राथमिक विद्यालय की छत टूट चुकी है और बारिश में पानी टपकता है। बच्चों के लिए बैठना नामुमकिन हो गया है।",
                "raw_text": "प्राथमिक विद्यालय की छत टूट चुकी है...",
                "language": "hi",
                "input_type": "text",
                "category": "Education",
                "location_id": locations[2].id,
                "state": "Uttar Pradesh",
                "district": "Varanasi",
                "village_town": "Cholapur Village",
                "latitude": 25.3420,
                "longitude": 82.9510,
                "ai_category": "Education",
                "ai_problem_summary": "Damaged composite primary school ceiling with severe leak hazard",
                "ai_urgency": "HIGH",
                "ai_confidence": 0.91,
                "status": "TRIAGED",
            },
            {
                "request_uid": "VS-SIT-1890",
                "title": "Agricultural Feeder Transformer Burnt Out",
                "description": "The main 250kVA agricultural feeder transformer burnt out 12 days ago. Over 60 tube wells are non-operational during peak crop irrigation.",
                "raw_text": "The main 250kVA agricultural feeder transformer burnt out 12 days ago...",
                "language": "en",
                "input_type": "text",
                "category": "Electricity",
                "location_id": locations[4].id,
                "state": "Uttar Pradesh",
                "district": "Sitapur",
                "village_town": "Maholi Rural Sector",
                "latitude": 27.5810,
                "longitude": 80.6650,
                "ai_category": "Electricity",
                "ai_problem_summary": "250kVA transformer outage crippling crop tube wells and rural households",
                "ai_urgency": "HIGH",
                "ai_confidence": 0.95,
                "status": "UNDER_REVIEW",
            },
        ]

        for r_data in requests_data:
            req = CitizenRequest(**r_data)
            db.add(req)
        db.commit()

        # 5. Demand Hotspots (PRD Section 8.5 & 8.6)
        hotspots = [
            Hotspot(
                title="Basti Road Infrastructure Demand Hotspot",
                category="Roads & Transport",
                state="Uttar Pradesh",
                district="Basti",
                cluster_area="Harraiya, Vikramjot & Basti Rural Corridor",
                latitude=26.7997,
                longitude=82.8021,
                radius_km=12.0,
                total_complaints=8420,
                severity_level="CRITICAL",
                demand_score=94.5,
                status="ACTIVE",
            ),
            Hotspot(
                title="Basti Healthcare Access Demand Hotspot",
                category="Healthcare",
                state="Uttar Pradesh",
                district="Basti",
                cluster_area="Kaptanganj & Saltaua Gopalpur",
                latitude=26.8350,
                longitude=82.7650,
                radius_km=10.0,
                total_complaints=3810,
                severity_level="CRITICAL",
                demand_score=92.0,
                status="ACTIVE",
            ),
            Hotspot(
                title="Gorakhpur Water & Sanitation Hotspot",
                category="Water & Sanitation",
                state="Uttar Pradesh",
                district="Gorakhpur",
                cluster_area="Bansgaon & Campierganj Lowlands",
                latitude=26.7606,
                longitude=83.3732,
                radius_km=14.0,
                total_complaints=6210,
                severity_level="CRITICAL",
                demand_score=89.0,
                status="ACTIVE",
            ),
            Hotspot(
                title="Varanasi School Infrastructure Deficit",
                category="Education",
                state="Uttar Pradesh",
                district="Varanasi",
                cluster_area="Cholapur & Pindra Composite Blocks",
                latitude=25.3176,
                longitude=82.9739,
                radius_km=8.5,
                total_complaints=2940,
                severity_level="HIGH",
                demand_score=76.5,
                status="ACTIVE",
            ),
            Hotspot(
                title="Sitapur Power Grid Outage Hotspot",
                category="Electricity",
                state="Uttar Pradesh",
                district="Sitapur",
                cluster_area="Maholi & Biswan Agricultural Belt",
                latitude=27.5683,
                longitude=80.6829,
                radius_km=9.0,
                total_complaints=2150,
                severity_level="HIGH",
                demand_score=78.0,
                status="ACTIVE",
            ),
        ]
        db.add_all(hotspots)
        db.commit()

        # 6. AI Recommendations (PRD Section 8.7 & 8.8)
        recommendations = [
            Recommendation(
                hotspot_id=hotspots[1].id,
                district="Basti",
                state="Uttar Pradesh",
                category="Healthcare",
                title="Upgrade Kaptanganj Primary Health Centre to 50-Bed Community Health Centre",
                problem_summary="Insufficient healthcare infrastructure (only 2 functional hospitals for 2,40,000 citizens with 15 km average travel distance and 3,810 verified complaints).",
                recommended_intervention="Develop/upgrade community healthcare infrastructure with 24x7 emergency ward, neonatal care unit, and digital tele-consultation hub.",
                priority_score=92.0,
                priority_status="CRITICAL PRIORITY",
                citizen_demand_score=33.5,     # 35% weight
                infrastructure_gap_score=23.5, # 25% weight
                population_impact_score=17.5,  # 20% weight
                demographic_need_score=8.5,    # 10% weight
                investment_deficit_score=9.0,  # 10% weight
                affected_population=180000,
                expected_beneficiaries="High (~1.8 lakh rural residents across 42 gram panchayats)",
                estimated_budget_inr=32000000.0, # 3.2 Crore
                status="SANCTIONED",
            ),
            Recommendation(
                hotspot_id=hotspots[0].id,
                district="Basti",
                state="Uttar Pradesh",
                category="Roads & Transport",
                title="Construct All-Weather Pucca Corridor for Harraiya-Vikramjot Agricultural Link",
                problem_summary="Heavy citizen demand (8,420 complaints) indicating impassable unpaved arterial road that isolates 60+ villages during July-October rains.",
                recommended_intervention="Upgrade/repair the identified rural road corridor: 18.4 km widening, asphalt concreting, and 4 reinforced box culverts.",
                priority_score=91.0,
                priority_status="CRITICAL PRIORITY",
                citizen_demand_score=34.5,
                infrastructure_gap_score=21.5,
                population_impact_score=18.0,
                demographic_need_score=8.5,
                investment_deficit_score=8.5,
                affected_population=210000,
                expected_beneficiaries="High (~2.1 lakh villagers and farmers)",
                estimated_budget_inr=48000000.0, # 4.8 Crore
                status="PROPOSED",
            ),
            Recommendation(
                hotspot_id=hotspots[2].id,
                district="Gorakhpur",
                state="Uttar Pradesh",
                category="Water & Sanitation",
                title="Deploy Piped Drinking Water & Overhead Chlorination Reservoirs",
                problem_summary="High concentration of waterborne disease complaints (6,210 requests) with groundwater contamination and broken handpumps.",
                recommended_intervention="Install 3 solar-powered multi-village piped water schemes with filtration and doorstep tap connections under Jal Jeevan Mission.",
                priority_score=89.0,
                priority_status="CRITICAL PRIORITY",
                citizen_demand_score=32.0,
                infrastructure_gap_score=23.0,
                population_impact_score=17.0,
                demographic_need_score=8.0,
                investment_deficit_score=9.0,
                affected_population=195000,
                expected_beneficiaries="High (~1.95 lakh citizens)",
                estimated_budget_inr=28000000.0, # 2.8 Crore
                status="SANCTIONED",
            ),
            Recommendation(
                hotspot_id=hotspots[3].id,
                district="Varanasi",
                state="Uttar Pradesh",
                category="Education",
                title="Structural Rehabilitation and Smart Classrooms in 12 Composite Schools",
                problem_summary="Dilapidated school buildings and inadequate classroom space impacting 2,940 registered complaints from parents and teachers.",
                recommended_intervention="Civil repairs of roofs, modern gender-segregated toilet blocks, and 12 digital STEM learning classrooms.",
                priority_score=78.5,
                priority_status="HIGH PRIORITY",
                citizen_demand_score=27.5,
                infrastructure_gap_score=18.5,
                population_impact_score=16.0,
                demographic_need_score=8.5,
                investment_deficit_score=8.0,
                affected_population=85000,
                expected_beneficiaries="Medium-High (~14,200 enrolled students)",
                estimated_budget_inr=16500000.0, # 1.65 Crore
                status="UNDER_REVIEW",
            ),
        ]
        db.add_all(recommendations)
        db.commit()

        # 7. Projects (Government Sanctioned Infrastructure Interventions)
        projects = [
            Project(
                recommendation_id=recommendations[0].id,
                project_code="PRJ-BST-MED-2026",
                title="Basti CHC Infrastructure Expansion & Trauma Ward",
                description="Civil construction and equipment procurement for 50-bed modern medical facility in Kaptanganj.",
                category="Healthcare",
                department="Department of Health & Family Welfare",
                district="Basti",
                state="Uttar Pradesh",
                sanctioned_budget_inr=32000000.0,
                spent_budget_inr=21000000.0,
                status="IN_PROGRESS",
                progress_pct=68.0,
                start_date=datetime.datetime.utcnow() - datetime.timedelta(days=120),
                expected_completion=datetime.datetime.utcnow() + datetime.timedelta(days=60),
            ),
            Project(
                recommendation_id=recommendations[2].id,
                project_code="PRJ-GKP-JJM-2026",
                title="Gorakhpur Piped Water Supply Network Stage 1",
                description="Installation of 3 water overhead storage reservoirs and 42km distribution pipeline in Bansgaon.",
                category="Water & Sanitation",
                department="State Jal Nigam / Jal Shakti",
                district="Gorakhpur",
                state="Uttar Pradesh",
                sanctioned_budget_inr=28000000.0,
                spent_budget_inr=25500000.0,
                status="IN_PROGRESS",
                progress_pct=85.0,
                start_date=datetime.datetime.utcnow() - datetime.timedelta(days=180),
                expected_completion=datetime.datetime.utcnow() + datetime.timedelta(days=30),
            ),
            Project(
                project_code="PRJ-VAR-RD-2025",
                title="Varanasi Sewapuri All-Weather Connectivity Corridor",
                description="22km four-season corridor connecting rural agricultural mandis to national highway.",
                category="Roads & Transport",
                department="Public Works Department (PWD)",
                district="Varanasi",
                state="Uttar Pradesh",
                sanctioned_budget_inr=54000000.0,
                spent_budget_inr=54000000.0,
                status="COMPLETED",
                progress_pct=100.0,
                start_date=datetime.datetime.utcnow() - datetime.timedelta(days=360),
                expected_completion=datetime.datetime.utcnow() - datetime.timedelta(days=45),
                actual_completion=datetime.datetime.utcnow() - datetime.timedelta(days=40),
            ),
        ]
        db.add_all(projects)
        db.commit()

        # 8. Impact Metrics (PRD Section 8.9 Benchmark)
        impacts = [
            ImpactMetric(
                project_id=projects[0].id,
                district="Basti",
                state="Uttar Pradesh",
                category="Healthcare",
                indicator_name="Healthcare Accessibility Index",
                before_value=42.0,
                after_value=71.0,
                unit="%",
                change_pct=69.0,
                status="MEASURED",
                notes="Access jumped from 42% to 71% following operationalization of maternal & emergency wing",
            ),
            ImpactMetric(
                project_id=projects[0].id,
                district="Basti",
                state="Uttar Pradesh",
                category="Healthcare",
                indicator_name="Average Healthcare Travel Distance",
                before_value=18.0,
                after_value=9.0,
                unit="km",
                change_pct=-50.0,
                status="MEASURED",
                notes="Emergency commute distance halved from 18 km to 9 km for 42 surrounding villages",
            ),
            ImpactMetric(
                project_id=projects[0].id,
                district="Basti",
                state="Uttar Pradesh",
                category="Healthcare",
                indicator_name="Citizen Complaints Volume",
                before_value=8420.0,
                after_value=2180.0,
                unit="complaints",
                change_pct=-74.1,
                status="MEASURED",
                notes="Citizen grievances dropped 74% within 60 days of initial service rollout",
            ),
            ImpactMetric(
                project_id=projects[1].id,
                district="Gorakhpur",
                state="Uttar Pradesh",
                category="Water & Sanitation",
                indicator_name="Clean Piped Water Household Coverage",
                before_value=31.0,
                after_value=84.0,
                unit="%",
                change_pct=170.9,
                status="MEASURED",
                notes="Piped tap connections extended to 18,400 households under JJM Stage 1",
            ),
            ImpactMetric(
                project_id=projects[2].id,
                district="Varanasi",
                state="Uttar Pradesh",
                category="Roads & Transport",
                indicator_name="Average Transit Time to District Mandi",
                before_value=95.0,
                after_value=35.0,
                unit="minutes",
                change_pct=-63.2,
                status="MEASURED",
                notes="Travel time reduced by over one hour on the all-weather bitumen corridor",
            ),
        ]
        db.add_all(impacts)
        db.commit()

        print("Database successfully seeded with VikasSetu baseline data!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
