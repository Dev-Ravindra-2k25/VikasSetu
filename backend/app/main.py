import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.db.seed_data import seed_database
from app.api.v1.router import api_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vikassetu")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables are created & seed data loaded
    logger.info("Initializing VikasSetu database schema...")
    Base.metadata.create_all(bind=engine)
    logger.info("Checking & seeding database...")
    seed_database()
    logger.info("VikasSetu backend services ready!")
    yield
    # Shutdown
    logger.info("Shutting down VikasSetu backend...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Citizen Development Intelligence Platform API (Digital Public Good)",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API V1
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "platform": "VikasSetu",
        "tagline": "AI-Powered Citizen Development Intelligence Platform",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
        "status": "operational",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "vikassetu-backend"}
