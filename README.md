# SevaSync AI - Smart Resource Allocation

**Google Solution Challenge 2026 Submission**

SevaSync AI is a high-fidelity prototype designed to streamline NGO resource allocation using AI. It digitizes paper surveys, visualizes community needs on a live heatmap, and matches volunteers using Vertex AI embeddings.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **Backend:** FastAPI (Python 3.11), containerized for Cloud Run
- **AI:** Gemini 1.5 Pro (Digitization), Vertex AI (Matching)
- **Database/Auth:** Firebase Firestore & Auth
- **Maps:** Google Maps JavaScript API

## Setup Instructions

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access at `http://localhost:3000`

### Backend
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate: `.\venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. Install dependencies: `pip install -r requirements.txt`
5. Run the API: `python main.py`
6. Access at `http://localhost:8000`

## Demo Flow
1. **Login:** Access the NGO dashboard.
2. **Upload:** Drag and drop a sample survey to see Gemini AI extraction.
3. **Heatmap:** View the live urgency heatmap and critical markers.
4. **Match:** Select a need and run the AI matching engine.
5. **Dispatch:** Send an SMS alert to the best-fit volunteer.
6. **Impact:** Track mission success in the analytics dashboard.
