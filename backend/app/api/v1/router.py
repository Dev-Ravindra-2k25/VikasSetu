from fastapi import APIRouter
from app.api.v1.endpoints import (
    requests,
    voice,
    hotspots,
    infrastructure,
    recommendations,
    projects,
    impact,
    dashboard,
    auth,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(requests.router, prefix="/requests", tags=["Citizen Requests"])
api_router.include_router(voice.router, prefix="/voice", tags=["Multilingual Voice"])
api_router.include_router(hotspots.router, prefix="/hotspots", tags=["Demand Hotspots"])
api_router.include_router(infrastructure.router, prefix="/infrastructure", tags=["Infrastructure Indicators"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["AI Recommendations"])
api_router.include_router(projects.router, prefix="/projects", tags=["Government Projects"])
api_router.include_router(impact.router, prefix="/impact", tags=["Impact Analytics"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard Statistics"])
