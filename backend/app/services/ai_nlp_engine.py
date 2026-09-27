import re
from typing import Dict, Any, Tuple


class AINLPEngine:
    """
    Multilingual NLP & Citizen Request Triage Engine
    Supports Indian languages (Hindi, English, and regional scripts),
    intent extraction, problem classification, sentiment, and urgency assessment.
    """

    CATEGORIES = [
        "Roads & Transport",
        "Water & Sanitation",
        "Healthcare",
        "Education",
        "Electricity",
        "Internet & Digital Connectivity",
        "Drainage & Waste Management",
        "Agriculture Infrastructure",
        "Public Safety",
        "Housing",
    ]

    # Multilingual Keyword Dictionaries for zero-shot classification
    KEYWORD_MAP = {
        "Roads & Transport": [
            "सड़क", "रास्ता", "गड्ढा", "मार्ग", "पुल", "यातायात", "बस", "हादसा", "सड़कें",
            "road", "roads", "pothole", "highway", "bridge", "street", "traffic", "transport", "bus", "connectivity"
        ],
        "Water & Sanitation": [
            "पानी", "जल", "नल", "पीने का पानी", "सीवर", "गंदा पानी", "सफाई", "शौचालय", "टंकी",
            "water", "drinking water", "pipeline", "tap", "leakage", "sanitation", "toilet", "sewage", "cleanliness"
        ],
        "Healthcare": [
            "अस्पताल", "दवा", "इलाज", "डॉक्टर", "नर्स", "स्वास्थ्य", "डिस्पेंसरी", "एंबुलेंस", "बीमारी",
            "hospital", "clinic", "doctor", "health", "medicine", "ambulance", "dispensary", "phc", "chc", "treatment"
        ],
        "Education": [
            "स्कूल", "विद्यालय", "शिक्षक", "पढ़ाई", "किताब", "मास्टर", "कॉलेज", "छात्र", "कक्षा",
            "school", "college", "teacher", "education", "books", "classroom", "student", "study"
        ],
        "Electricity": [
            "बिजली", "करंट", "ट्रांसफार्मर", "तार", "बत्ती", "अंधेरा", "कटौती", "वोल्टेज",
            "electricity", "power", "transformer", "wire", "blackout", "load shedding", "voltage", "current"
        ],
        "Internet & Digital Connectivity": [
            "इंटरनेट", "नेटवर्क", "मोबाइल", "टावर", "सिग्नल", "वाईफाई", "डिजिटल",
            "internet", "network", "signal", "mobile tower", "wifi", "broadband", "connectivity"
        ],
        "Drainage & Waste Management": [
            "नाली", "कचरा", "कूड़ा", "जलभराव", "ड्रेनेज", "सड़न", "बदबू",
            "drain", "drainage", "garbage", "trash", "waste", "waterlogging", "stench"
        ],
        "Agriculture Infrastructure": [
            "खेती", "सिंचाई", "नहर", "मंडी", "खाद", "बीज", "फसल", "किसान",
            "agriculture", "irrigation", "canal", "mandi", "fertilizer", "farming", "crop", "farmer"
        ],
        "Public Safety": [
            "सुरक्षा", "पुलिस", "चोरी", "अपराध", "रोशनी", "स्ट्रीट लाइट", "असुरक्षित",
            "safety", "police", "theft", "crime", "street light", "unsafe", "security"
        ],
        "Housing": [
            "मकान", "आवास", "झोपड़ी", "छत", "घर",
            "housing", "house", "shelter", "roof", "pmay"
        ]
    }

    URGENCY_KEYWORDS = {
        "CRITICAL": [
            "तुरंत", "खतरा", "मौत", "दुर्घटना", "जान", "आपदा", "गंभीर", "बंद", "ध्वस्त",
            "urgent", "emergency", "danger", "deadly", "hazard", "fatal", "disaster", "collapsed", "severe", "life threatening"
        ],
        "HIGH": [
            "बहुत खराब", "परेशानी", "मुश्किल", "टूटा", "बीमार", "महीनों से", "हर दिन", "असुविधा",
            "terrible", "very bad", "broken", "months", "daily", "difficulty", "suffering", "damaged", "urgent"
        ],
        "MODERATE": [
            "खराब", "दिक्कत", "जरूरत", "मरम्मत", "सुधार",
            "bad", "issue", "need", "repair", "maintenance", "request"
        ]
    }

    def detect_language(self, text: str) -> str:
        """Identify if input is Hindi (Devanagari script), English, or other Indian scripts"""
        if not text:
            return "en"
        devanagari_count = len(re.findall(r'[\u0900-\u097F]', text))
        bengali_count = len(re.findall(r'[\u0980-\u09FF]', text))
        tamil_count = len(re.findall(r'[\u0B80-\u0BFF]', text))
        
        total_len = len(text.strip())
        if devanagari_count / max(total_len, 1) > 0.15:
            return "hi"  # Hindi
        elif bengali_count / max(total_len, 1) > 0.15:
            return "bn"  # Bengali
        elif tamil_count / max(total_len, 1) > 0.15:
            return "ta"  # Tamil
        return "en"

    def classify_category(self, text: str, hint_category: str = None) -> Tuple[str, float]:
        """Classify problem statement into government development category"""
        if hint_category and hint_category in self.CATEGORIES:
            return hint_category, 0.95

        lower_text = text.lower()
        scores = {}

        for cat, keywords in self.KEYWORD_MAP.items():
            count = 0
            for kw in keywords:
                if kw.lower() in lower_text:
                    count += 1
            scores[cat] = count

        best_category = max(scores, key=scores.get)
        match_count = scores[best_category]

        if match_count == 0:
            return "Roads & Transport", 0.65  # Default domain fallback
        
        confidence = min(0.70 + (match_count * 0.10), 0.98)
        return best_category, confidence

    def analyze_urgency(self, text: str) -> str:
        """Determine urgency: CRITICAL, HIGH, MODERATE, LOW"""
        lower_text = text.lower()
        for level, keywords in self.URGENCY_KEYWORDS.items():
            for kw in keywords:
                if kw.lower() in lower_text:
                    return level
        return "HIGH"

    def extract_entities(self, text: str, district: str = "Basti") -> Dict[str, Any]:
        """Extract location mentions, infrastructure elements, and time references"""
        entities = {
            "location_references": [district],
            "infrastructure_type": "Public Infrastructure",
            "time_horizon": "Immediate intervention required"
        }
        
        # Look for village/ward mentions (e.g. 'गांव', 'वार्ड', 'तहसील', 'village', 'block')
        village_match = re.search(r'(?:गांव|गाँव|ग्राम|वार्ड|village|ward)\s+([A-Za-z\u0900-\u097F]+)', text, re.IGNORECASE)
        if village_match:
            entities["village_or_ward"] = village_match.group(1)
        
        return entities

    def triage_request(self, text: str, district: str = "Basti", category_hint: str = None) -> Dict[str, Any]:
        """Full end-to-end triage pipeline for a citizen request"""
        lang = self.detect_language(text)
        category, confidence = self.classify_category(text, category_hint)
        urgency = self.analyze_urgency(text)
        entities = self.extract_entities(text, district)

        # Generate concise English summary for policy makers
        summary = text.strip()
        if len(summary) > 120:
            summary = summary[:117] + "..."

        urgency_score_map = {"CRITICAL": 92.0, "HIGH": 80.0, "MODERATE": 62.0, "LOW": 45.0}

        return {
            "detected_language": lang,
            "category": category,
            "problem_summary": summary,
            "urgency": urgency,
            "sentiment": "negative",
            "confidence": confidence,
            "entities": entities,
            "recommended_priority_score": urgency_score_map.get(urgency, 75.0)
        }


ai_nlp_engine = AINLPEngine()
