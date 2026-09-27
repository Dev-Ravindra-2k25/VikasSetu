# VikasSetu — AI-Powered Citizen Development Intelligence Platform

> **Product Type**: Multilingual AI Platform / Digital Public Good  
> **Architecture**: Clean Modular Architecture (Next.js, React, Tailwind CSS, FastAPI, PostgreSQL/SQLite)

VikasSetu is an AI-powered, multilingual citizen development intelligence platform designed to bridge the gap between grassroots citizen needs and public infrastructure planning across India.

Citizens submit development-related requests and problems using **voice** or **text** in their preferred language (Hindi, English, Bengali, Tamil, etc.). The platform uses AI to classify, translate, geolocate, and aggregate these requests with demographic, infrastructure gap, and public investment data to identify **Demand Hotspots**, calculate an explainable **Development Priority Score (0–100)**, and deliver actionable recommendations to policymakers.

---

## 🏛️ System Architecture

```
crewAi/
├── backend/                        # FastAPI Backend
│   ├── app/
│   │   ├── api/v1/endpoints/       # Modular API Endpoints
│   │   │   ├── auth.py             # Authentication & JWT tokens
│   │   │   ├── requests.py         # Citizen requests CRUD & triage
│   │   │   ├── voice.py            # Multilingual voice processing
│   │   │   ├── hotspots.py         # Geospatial demand clustering
│   │   │   ├── infrastructure.py   # Infrastructure gap indicators
│   │   │   ├── recommendations.py  # AI 5-factor project recommendations
│   │   │   ├── projects.py         # Sanctioned public infrastructure works
│   │   │   ├── impact.py           # Before/after outcome metrics
│   │   │   └── dashboard.py        # Aggregated statistics & KPIs
│   │   ├── core/                   # Config, Database Engine, Security
│   │   ├── models/                 # SQLAlchemy ORM Models
│   │   ├── schemas/                # Pydantic v2 validation models
│   │   ├── services/               # AI NLP, Priority Scorer, Hotspot Engine
│   │   ├── db/seed_data.py         # Realistic Indian districts seed data
│   │   └── main.py                 # Application Lifespan & CORS
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                       # Next.js 14+ App Router & Tailwind CSS
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Comprehensive Homepage (Hero, Map, Stats, DPG)
│   │   │   ├── citizen/page.tsx    # Dashboard 1: Citizen Submission & Tracking
│   │   │   ├── intelligence/page.tsx # Dashboard 2: Demand Hotspots Radar
│   │   │   ├── government/page.tsx # Dashboard 3: Policymaker Decision Hub
│   │   │   └── impact/page.tsx     # Dashboard 4: Impact Analytics & Outcomes
│   │   ├── components/             # Navbar, Footer, VoiceInput, LeafletMap, etc.
│   │   ├── lib/api.ts              # Typed API Client with fallback resilience
│   │   └── types/index.ts          # Complete TypeScript interfaces
│   ├── package.json
│   └── tailwind.config.ts
│
├── docker-compose.yml              # PostgreSQL + PostGIS + FastAPI + Next.js
└── README.md
```

---

## 📊 The 4 Core Dashboards

1. **Citizen Dashboard (`/citizen`)**:
   - Multilingual voice recording (Web Speech API with live audio waveform)
   - Real-time AI extraction drawer showing detected language, category, confidence, and urgency
   - 1-click PRD benchmark scenario tests (Hindi & English)
   - Request tracking timeline (Submitted $\to$ Triaged $\to$ In Hotspot $\to$ Under Review $\to$ Sanctioned)

2. **Demand Intelligence Dashboard (`/intelligence`)**:
   - Interactive live geospatial radar map showing demand hotspots with colored severity rings
   - Multi-category filtering (Roads, Water, Healthcare, Education, Electricity, Connectivity)
   - Benchmark Infrastructure Gap matrix comparing operational units, coverage %, and commute distance

3. **Government / Policymaker Dashboard (`/government`)**:
   - AI Project Recommendations sorted by Development Priority Score
   - Transparent 5-factor scoring dial & explainable reasoning dossier
   - Executive action modal to sanction recommendations, allocate budget, and assign departments

4. **Impact Analytics Dashboard (`/impact`)**:
   - Quantified before vs after outcome comparisons (e.g. Healthcare access 42% $\to$ 71%, Commute 18km $\to$ 9km, Grievances -74%)
   - Public works physical progress & budget expenditure tracker

---

## ⚙️ Development Priority Score Formula

As specified in PRD Section 8.7:
$$\text{Priority Score} = 0.35 \times \text{Demand} + 0.25 \times \text{InfraGap} + 0.20 \times \text{PopulationImpact} + 0.10 \times \text{DemographicNeed} + 0.10 \times \text{InvestmentDeficit}$$

- **Critical Priority**: $\ge 85$ (Immediate capital intervention)
- **High Priority**: $70 - 84$
- **Moderate Priority**: $50 - 69$
- **Low Priority**: $< 50$

---

## 🚀 Quickstart Guide

### 1. Backend (FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python -m app.db.seed_data
python -m uvicorn app.main:app --port 8000 --reload
```
API Documentation will be live at `http://localhost:8000/docs`.

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to view the application.

### 3. Docker Compose (Full Stack with PostgreSQL)
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`
