from google import genai
from google.genai import types
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDbYaSa6DlsoAdEZXtggDmv8CTKFL-tidc")
client = genai.Client(api_key=GEMINI_API_KEY)

def process_survey_image(image_path: str) -> dict:
    """OCR + structure + prioritize a paper survey using Gemini Vision."""
    with open(image_path, "rb") as f:
        image_data = f.read()

    prompt = """
    You are a community needs analyst. Extract ALL information from this 
    survey/field report image. Return ONLY valid JSON with this structure:
    {
      "location": "area/village name",
      "needs": [
        {
          "category": "food|water|medical|shelter|education|livelihood",
          "description": "specific need description",
          "urgency": 1-10,
          "affected_count": estimated number,
          "contact": "reporter name/phone if present"
        }
      ],
      "reported_date": "date if visible",
      "additional_notes": "any other relevant info"
    }
    Urgency 8-10 = life-threatening, 5-7 = serious, 1-4 = moderate.
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-pro",
            contents=[
                prompt,
                types.Part.from_bytes(data=image_data, mime_type="image/jpeg")
            ]
        )
        # Handle potential markdown in response
        json_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(json_text)
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}

# Test run if file is executed directly
if __name__ == "__main__":
    # Example: python survery.py path/to/image.jpg
    import sys
    if len(sys.argv) > 1:
        result = process_survey_image(sys.argv[1])
        print(json.dumps(result, indent=2))
    else:
        print("Please provide an image path: python survery.py <image_path>")