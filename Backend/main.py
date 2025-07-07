from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()
HF_API_TOKEN = os.getenv("HF_API_TOKEN", "")
HF_MODEL = os.getenv("HF_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")
HF_PROVIDER = os.getenv("HF_PROVIDER", "novita")

client = InferenceClient(
    provider=HF_PROVIDER,
    api_key=HF_API_TOKEN,
)

app = FastAPI(title="PaletteAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PaletteRequest(BaseModel):
    businessType: str
    industry: str
    audience: str
    designStyle: str
    colorPref: str
    usage: list

@app.post("/api/generate-palette")
async def generate_palette(req: PaletteRequest):
    prompt = f"""
Generate a professional, harmonious color palette for a {req.businessType} business in the {req.industry} industry.
Target audience: {req.audience}.
Design style: {req.designStyle}. Color preference: {req.colorPref}.
Palette will be used for: {', '.join(req.usage)}.

Please return 8 colors in this JSON format:
{{
  "primary": "#hexcode",
  "secondary": "#hexcode",
  "accent": "#hexcode",
  "neutral": "#hexcode",
  "background": "#hexcode",
  "highlight": "#hexcode",
  "muted": "#hexcode",
  "success": "#hexcode",
  "fontSuggestion": "font-family-name",
  "colorNamesDetailed": [
    {{ "role": "Primary", "name": "Sky Blue" }},
    {{ "role": "Secondary", "name": "Royal Purple" }},
    {{ "role": "Accent", "name": "Crimson Red" }},
    {{ "role": "Neutral", "name": "Ivory" }},
    {{ "role": "Background", "name": "Charcoal" }},
    {{ "role": "Highlight", "name": "Turquoise" }},
    {{ "role": "Muted", "name": "Slate Gray" }},
    {{ "role": "Success", "name": "Emerald" }}
  ],
  "colorNames": ["Primary", "Secondary", "Accent", "Neutral", "Background", "Highlight", "Muted", "Success"],
  "colorPsychology": [
    "reason for primary",
    "reason for secondary",
    "reason for accent",
    "reason for neutral",
    "reason for background",
    "reason for highlight",
    "reason for muted",
    "reason for success"
  ]
}}
For each color, provide a detailed, one-sentence color psychology justification and ensure all colors work together. The palette should be suitable for both digital and print, and accessible for all users.
    """.strip()

    try:
        completion = client.chat.completions.create(
            model=HF_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=768,
            temperature=0.7,
        )
        palette = None
        try:
            palette = eval(completion.choices[0].message.content)
        except Exception:
            raise HTTPException(status_code=500, detail="AI did not return valid JSON.")
        return {"palette": palette}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Palette generation failed: {str(e)}")

@app.get("/")
async def root():
    return {"status": "PaletteAI Backend is running"}
