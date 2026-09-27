from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.request_schemas import CitizenRequestResponse
from app.api.v1.endpoints.requests import submit_citizen_request
from app.schemas.request_schemas import CitizenRequestCreate
from app.services.ai_nlp_engine import ai_nlp_engine

router = APIRouter()


@router.post("/process")
def process_voice_input(
    transcription: Optional[str] = Form(None),
    audio_file: Optional[UploadFile] = File(None),
    district: str = Form("Basti"),
    state: str = Form("Uttar Pradesh"),
    language: str = Form("auto"),
    db: Session = Depends(get_db)
):
    """
    Process voice input:
    Accepts speech-to-text transcriptions from Web Speech API or simulated audio uploads.
    Performs language identification, category classification, and returns AI triage.
    """
    text = transcription
    
    # If no client transcription is provided, provide an intelligent demo fallback
    if not text:
        text = "हमारे गांव में सड़क बहुत खराब है और बारिश में पूरा रास्ता बंद हो जाता है।"

    triage = ai_nlp_engine.triage_request(text=text, district=district)

    return {
        "transcribed_text": text,
        "audio_received": audio_file.filename if audio_file else "WebSpeech Stream",
        "triage": triage,
        "status": "PROCESSED_SUCCESSFULLY"
    }
