# SevaSync AI — Master Prompt, PRD \& Implementation Plan

### Solution Challenge 2026 · Smart Resource Allocation · Antigravity Prototype Edition

\---

> \\\*\\\*How to use this document\\\*\\\*
> This file is your single source of truth. Share it with Antigravity (or any AI-assisted prototyping tool / NotebookLM) and use the Master Prompt at the top to instantly generate a full prototype. Every section below adds the depth the tool needs to produce accurate, high-quality output.

\---

## PART 0 — MASTER PROMPT FOR ANTIGRAVITY

Copy the block below and paste it as your first message in Antigravity:

```
ROLE: You are a senior full-stack engineer, UX designer, and Google Cloud architect 
building a high-fidelity, clickable prototype for "SevaSync AI" — a 
Solution Challenge 2026 submission for Smart Resource Allocation: Data-Driven 
Volunteer Coordination for Social Impact.

PROJECT CONTEXT:
Local NGOs and social groups collect community needs data through paper surveys 
and field reports. This data is scattered, unstructured, and invisible to decision 
makers. SevaSync AI solves this by digitizing all inputs with Google Vision AI, 
processing them with Gemini 1.5 Pro to extract and prioritize needs, rendering a 
live urgency heatmap on Google Maps, and automatically matching + dispatching 
volunteers using Vertex AI embeddings — all in under 90 seconds from data entry.

YOUR TASK: Build a complete, working prototype with the following:

1. SCREENS TO BUILD (in order of priority):
   a. Landing / Login screen — NGO branding, Firebase Auth with Google Sign-In
   b. Survey Upload screen — drag-and-drop image upload, camera capture option, 
      processing status indicator ("Gemini is reading your survey...")
   c. Community Need Heatmap — Google Maps with color-coded urgency pins 
      (red = critical, amber = serious, green = moderate), filterable by category
   d. Needs Dashboard — sortable table of all extracted needs with urgency score, 
      location, category, affected count, and status badge
   e. Volunteer Registry — volunteer cards with skills, location, availability toggle
   f. AI Match \\\& Dispatch screen — select a need → see ranked volunteer matches 
      with AI explanation → one-click dispatch with SMS preview
   g. Impact Dashboard — Looker Studio-style charts: needs resolved over time, 
      volunteer hours, category breakdown donut chart, response time metric
   h. Admin Panel — manage NGO profile, API keys, notification settings

2. TECH STACK TO USE:
   - Frontend: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
   - Backend: FastAPI (Python 3.11) containerized for Cloud Run
   - Database: Firebase Firestore (real-time)
   - Auth: Firebase Authentication (Google OAuth)
   - AI: Gemini 1.5 Pro API (survey processing), Vertex AI text-embedding-004 (matching)
   - OCR: Google Document AI (paper survey digitization)
   - Maps: Google Maps JavaScript API + Heatmap layer
   - Notifications: Firebase Cloud Messaging
   - Analytics: Recharts (prototype), production → Looker Studio
   - Hosting: Cloud Run (API) + Firebase Hosting (frontend)

3. DESIGN SYSTEM:
   - Primary color: #1A73E8 (Google Blue)
   - Accent: #34A853 (Google Green for positive states)
   - Warning: #FBBC04 (Google Yellow for medium urgency)
   - Critical: #EA4335 (Google Red for high urgency)
   - Font: Google Sans / Inter
   - Style: Clean, card-based, mobile-first, accessible (WCAG AA)
   - Tone: Humanitarian-professional — warm but data-driven

4. KEY USER FLOWS TO MAKE CLICKABLE:
   Flow A (NGO Coordinator): Login → Upload Survey → View Heatmap → See Need → 
                              Click Match → Dispatch Volunteer → Track in Dashboard
   Flow B (Admin): Login → View Analytics → Export Report → Manage Volunteers
   Flow C (Volunteer): Receive SMS → Open web link → Accept task → Mark complete

5. DEMO DATA TO INCLUDE (hardcode for prototype):
   - 12 community needs across 4 categories (food, water, medical, shelter)
   - 8 volunteers with varied skill profiles and locations
   - Urgency scores ranging from 3 to 9.8
   - 3 areas: North Zone, Central Zone, South Zone
   - Sample survey image processing result shown as animation

6. API INTEGRATION PATTERN (mock for prototype, real for production):
   - Survey upload → mock 3-second "Gemini processing" animation → show structured result
   - Matching → show cosine similarity scores (0.72, 0.89, 0.61) with explanations
   - Dispatch → show "SMS sent" confirmation with message preview

7. DELIVERABLES:
   - Complete Next.js project with all 8 screens
   - FastAPI backend with 6 endpoints (upload, needs, volunteers, match, dispatch, stats)
   - Firebase configuration files
   - Docker + Cloud Run deployment files
   - README with setup steps

Build the prototype now. Start with the project structure, then implement screen by screen. 
Make it feel real, not like a mockup. Every button should do something.
```

\---

## PART 1 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1.1 Executive Summary

|Field|Details|
|-|-|
|Product Name|SevaSync AI|
|Version|1.0 — Prototype (Solution Challenge 2026)|
|Author|Team \[Your Name]|
|Date|April 2026|
|Challenge|Smart Resource Allocation: Data-Driven Volunteer Coordination|
|Organization|Google Developer Student Clubs|

**Problem Statement**

Local social groups and NGOs collect critical community needs data through paper surveys and field reports. This data sits siloed across notebooks, WhatsApp messages, email attachments, and filing cabinets. Decision makers cannot see the aggregate picture. The result: the most urgent needs go unmet because no coordinator knows they exist, volunteers arrive at the wrong place, and impact is impossible to measure.

**Solution Summary**

SevaSync AI is an end-to-end intelligence platform that:

1. Digitizes and structures all forms of community data using Google Vision AI and Gemini 1.5 Pro
2. Builds a real-time, geo-tagged urgency map of community needs
3. Automatically matches available volunteers to the highest-priority tasks using AI semantic matching
4. Dispatches volunteers with one click and tracks completion for impact measurement

**Key Metric Goal:** Reduce coordinator triage time from 4 hours to under 15 minutes per incident.

\---

### 1.2 Target Users

#### Primary User: NGO Coordinator / Field Supervisor

* Collects paper surveys from villages or urban communities
* Needs to quickly understand which areas have the most urgent needs
* Currently spends 3–4 hours per week manually digitizing and organizing data
* Pain point: "I have 200 surveys but I don't know where to start."

#### Secondary User: Volunteer

* Has skills in medical aid, food distribution, teaching, or construction
* Needs clear, actionable task assignments with location and contact information
* Pain point: "I want to help but I never know where I'm actually needed."

#### Tertiary User: NGO Administrator / Director

* Needs aggregate impact data for donor reports and funding applications
* Wants to see which areas are underserved and track volunteer utilization
* Pain point: "We can't prove our impact because we don't have the data."

\---

### 1.3 Goals and Non-Goals

**Goals (v1.0 Prototype)**

* Demonstrate end-to-end flow from paper survey to volunteer dispatch
* Show Google AI integration (Gemini, Vertex AI, Vision AI, Maps)
* Provide clickable prototype for all 3 user types
* Deploy on Google Cloud with public demo URL
* Win Solution Challenge 2026 shortlisting

**Non-Goals (v1.0)**

* Full offline support (v2.0)
* Native mobile app (v2.0, progressive web app for now)
* Multi-language voice input (v2.0)
* Integration with government welfare APIs (v3.0)
* Blockchain audit trail (not in scope)

\---

### 1.4 Feature Requirements

#### F1 — Survey Digitization Engine (Priority: P0)

**Description:** Accept paper survey images, WhatsApp screenshots, PDF field reports, or typed text and convert them into structured JSON need records.

**Acceptance Criteria:**

* User can upload image (JPEG, PNG, PDF) via drag-and-drop or camera capture
* System calls Google Document AI to extract text from image
* Extracted text is sent to Gemini 1.5 Pro with structured extraction prompt
* System returns JSON with: location, need category, description, urgency score (1–10), affected count, reporter name/contact
* Processing completes in under 10 seconds for a single-page survey
* If image is unreadable, system shows helpful error with retry option
* All structured records are saved to Firestore with timestamp and source document link

**Edge Cases:**

* Blurry or partially visible surveys → Document AI confidence score shown, low-confidence fields flagged
* Multi-page surveys → batch processing, results aggregated per location
* Surveys in regional languages → Gemini multilingual support handles translation automatically

\---

#### F2 — Community Need Heatmap (Priority: P0)

**Description:** A live Google Maps view showing all community needs geo-tagged and color-coded by urgency.

**Acceptance Criteria:**

* Map loads with all open needs as pins within 2 seconds
* Pin colors: Red (#EA4335) = urgency 8–10, Amber (#FBBC04) = 5–7, Green (#34A853) = 1–4
* Clicking a pin shows a detail card: category, description, urgency score, affected count, status, AI-suggested volunteer count
* Filter bar allows filtering by: category (food/water/medical/shelter/education/livelihood), urgency tier, date range, status (open/assigned/resolved)
* Heatmap density layer toggle shows aggregate hotspots
* Map updates in real time when new needs are added (Firestore onSnapshot listener)
* Export map screenshot to PNG for reports

\---

#### F3 — AI Matching Engine (Priority: P0)

**Description:** When a coordinator selects a need, the system automatically ranks all available volunteers by suitability and explains the reasoning.

**Matching Algorithm:**

1. Generate text embedding for the need: `"\\\[Category]: \\\[Description]. Location: \\\[Area]. Skills required: \\\[AI-inferred skills]."`
2. Compare against pre-computed volunteer profile embeddings using cosine similarity
3. Apply geo-proximity bonus: volunteers within 5km get +0.1 score boost
4. Apply availability filter: only show volunteers marked available
5. Apply skill match filter: surface top 5 results with similarity scores
6. Generate Gemini explanation for top 3 matches: "Recommended because: medical training matches the first aid requirement; located 2.3km away; available today."

**Acceptance Criteria:**

* Match results appear within 3 seconds of selecting a need
* Each volunteer card shows: name, photo/avatar, skills, distance, availability status, match score (%), AI explanation
* Coordinator can override and choose any volunteer on the list
* One-click dispatch sends: Firebase notification (in-app), SMS via Cloud Messaging, email summary

\---

#### F4 — Volunteer Registry (Priority: P1)

**Description:** A searchable database of all registered volunteers with profile management.

**Volunteer Profile Fields:**

* Full name, photo, contact (phone, email)
* Skills: multi-select from standard taxonomy (medical, food distribution, construction, education, counseling, logistics, tech)
* Languages spoken
* Geographic availability zones (can select up to 3)
* Availability: always/weekdays/weekends/custom schedule
* Active/inactive toggle
* Assignment history (last 5 tasks)
* Reliability score (auto-calculated from completion rate)
* Volunteer since date, total hours contributed

**Acceptance Criteria:**

* Volunteers can self-register via public form link (no login required)
* NGO admin can approve/reject registrations
* Search by name, skill, area
* Volunteer profile auto-generates text embedding on save for matching
* Bulk import via CSV for existing volunteer lists

\---

#### F5 — Impact Dashboard (Priority: P1)

**Description:** Analytics dashboard for NGO directors showing impact metrics.

**Charts and Metrics to Display:**

* Total needs reported (this week / month / all time)
* Needs resolved (with percentage change vs. last period)
* Average response time: survey upload → volunteer dispatched (target: < 90 minutes)
* Volunteer utilization rate (% of registered volunteers active this month)
* Category breakdown: donut chart of needs by type
* Geographic heat trend: which zones have increasing need
* Top 5 most active volunteers (leaderboard)
* Donor-ready summary card: exportable as PDF

**Acceptance Criteria:**

* Dashboard loads in under 3 seconds
* All charts are interactive (hover for detail)
* Date range picker: last 7 days / 30 days / 90 days / custom
* Export report as PDF with NGO logo and summary narrative
* Real-time updates via Firestore listeners

\---

#### F6 — Notification and Dispatch System (Priority: P1)

**Description:** Multi-channel notification system for volunteer dispatch.

**Channels:**

* Firebase Cloud Messaging (in-app push notification)
* SMS via Twilio (or Firebase Extensions SMS)
* Email via SendGrid

**SMS Template:**

```
\\\[CommunityPulse] Hi {name}, you've been matched to a task!
Need: {category} in {location}
Urgency: {urgency\\\_label}
Contact: {reporter\\\_contact}
Details: {short\\\_description}
Accept: {task\\\_url}
Reply STOP to opt out.
```

**Acceptance Criteria:**

* Volunteer receives notification within 30 seconds of dispatch
* Task link opens mobile-optimized task detail page
* Volunteer can accept or decline from the link (no login required)
* On acceptance, coordinator receives confirmation notification
* If volunteer declines or no response in 2 hours, system prompts coordinator to reassign

\---

### 1.5 Non-Functional Requirements

|Category|Requirement|
|-|-|
|Performance|Heatmap loads < 2s, AI processing < 10s, matching < 3s|
|Availability|99.5% uptime (Cloud Run auto-scaling)|
|Security|Firebase Auth, Firestore security rules, no PII in logs|
|Scalability|Handle 1000 concurrent NGO users, 10,000 volunteers|
|Accessibility|WCAG 2.1 AA — keyboard navigable, screen reader compatible|
|Mobile|Progressive Web App — works on Android 8+ browser|
|Offline|Show cached heatmap data when offline (IndexedDB)|
|Data Privacy|GDPR-aligned: user data deletion on request, data retention 2 years|

\---

### 1.6 Google AI Services — Technical Specification

#### Gemini 1.5 Pro

**Use Case 1 — Survey Structuring**

```
Model: gemini-1.5-pro
Temperature: 0.1 (deterministic for extraction)
Max tokens: 1024
Input: Survey image + extraction prompt
Output: Structured JSON (location, needs array, urgency scores)
```

**Use Case 2 — Volunteer Match Explanation**

```
Model: gemini-1.5-flash (cheaper for explanations)
Temperature: 0.4
Max tokens: 256
Input: Need details + volunteer profile
Output: 2-sentence plain-English explanation
```

**Use Case 3 — Anomaly Detection**

```
Nightly batch job: send last 24h needs to Gemini
Ask: "Are there emerging patterns or unusual clusters in this data?"
Output: Alert text for NGO director morning briefing
```

#### Vertex AI — text-embedding-004

**Volunteer Profile Embedding** (computed once on registration, stored in Firestore):

```
Input: "Skills: {skills\\\_list}. Experience: {experience}. Languages: {languages}. 
        Service area: {zones}. Background: {bio\\\_summary}"
Output: 768-dimensional float vector stored as Firestore array field
```

**Need Embedding** (computed on creation):

```
Input: "Community need — Category: {category}. Description: {description}. 
        Location: {location}. Urgency: {urgency}/10. Skills needed: {ai\\\_inferred\\\_skills}"
Output: 768-dimensional float vector
```

**Similarity Search:**

```python
# In production: use Vertex AI Vector Search (Matching Engine) for scale
# For prototype: compute cosine similarity in Python on Cloud Run
import numpy as np

def find\\\_matches(need\\\_embedding, volunteers, top\\\_k=5):
    scores = \\\[]
    for v in volunteers:
        if v.get('available') and v.get('embedding'):
            sim = cosine\\\_similarity(need\\\_embedding, v\\\['embedding'])
            geo\\\_bonus = 0.1 if distance\\\_km(need\\\_loc, v\\\_loc) < 5 else 0
            scores.append((v, sim + geo\\\_bonus))
    return sorted(scores, key=lambda x: x\\\[1], reverse=True)\\\[:top\\\_k]
```

#### Google Document AI

**Processor Type:** General Document OCR Processor (or Form Parser for structured surveys)

```
Project: your-project-id
Processor: projects/{id}/locations/us/processors/{processor-id}
Input: Base64-encoded image or PDF
Output: Document object with full text, key-value pairs, tables
```

#### Google Maps JavaScript API

**Features Used:**

* `google.maps.Map` — base map
* `google.maps.visualization.HeatmapLayer` — density overlay
* `google.maps.Marker` + custom SVG icons — urgency pins
* `google.maps.InfoWindow` — need detail cards on pin click
* `google.maps.Geocoder` — convert location names to coordinates
* `google.maps.geometry.spherical.computeDistanceBetween` — proximity scoring

\---

## PART 2 — IMPLEMENTATION PLAN

### 2.1 Project Structure

```
SevaSync-ai/
├── frontend/                          # Next.js 14 App
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/page.tsx         # Screen 1: Login
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx             # Sidebar navigation
│   │   │   ├── page.tsx               # Screen 2: Overview/Home
│   │   │   ├── upload/page.tsx        # Screen 3: Survey Upload
│   │   │   ├── heatmap/page.tsx       # Screen 4: Need Heatmap
│   │   │   ├── needs/page.tsx         # Screen 5: Needs Table
│   │   │   ├── volunteers/page.tsx    # Screen 6: Volunteer Registry
│   │   │   ├── match/page.tsx         # Screen 7: AI Match \\\& Dispatch
│   │   │   ├── impact/page.tsx        # Screen 8: Impact Dashboard
│   │   │   └── admin/page.tsx         # Screen 9: Admin Panel
│   │   └── task/\\\[id]/page.tsx         # Screen 10: Volunteer Task View (public)
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── NeedCard.tsx
│   │   ├── VolunteerCard.tsx
│   │   ├── MatchResult.tsx
│   │   ├── UrgencyBadge.tsx
│   │   ├── ProcessingAnimation.tsx
│   │   └── HeatmapLayer.tsx
│   ├── lib/
│   │   ├── firebase.ts                # Firebase config
│   │   ├── gemini.ts                  # Gemini API calls
│   │   ├── matching.ts                # Client-side match display
│   │   └── hooks/
│   │       ├── useNeeds.ts            # Firestore real-time needs
│   │       └── useVolunteers.ts       # Firestore real-time volunteers
│   ├── public/
│   └── next.config.js
│
├── backend/                           # FastAPI Python
│   ├── main.py                        # App entry point
│   ├── routers/
│   │   ├── upload.py                  # POST /api/upload
│   │   ├── needs.py                   # GET/POST /api/needs
│   │   ├── volunteers.py              # GET/POST /api/volunteers
│   │   ├── match.py                   # POST /api/match
│   │   ├── dispatch.py                # POST /api/dispatch
│   │   └── stats.py                   # GET /api/stats
│   ├── services/
│   │   ├── gemini\\\_service.py          # Gemini API integration
│   │   ├── document\\\_ai\\\_service.py     # Document AI OCR
│   │   ├── vertex\\\_service.py          # Vertex AI embeddings
│   │   ├── firebase\\\_service.py        # Firestore CRUD
│   │   └── notification\\\_service.py    # FCM + SMS dispatch
│   ├── models/
│   │   ├── need.py                    # Pydantic models
│   │   └── volunteer.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── deployment/
│   ├── cloudbuild.yaml                # Cloud Build CI/CD
│   ├── cloudrun-api.yaml              # Cloud Run service config
│   └── firebase.json                  # Firebase Hosting config
│
├── scripts/
│   ├── seed\\\_demo\\\_data.py              # Populate Firestore with demo data
│   └── index\\\_volunteer\\\_embeddings.py  # Batch embed all volunteer profiles
│
└── README.md
```

\---







\*\* Deployment, Polish \& Demo Prep (Days 22–28)\*\*

Cloud Deployment\*\*

* \[ ] Write Dockerfile for FastAPI backend
* \[ ] Deploy backend to Google Cloud Run
* \[ ] Set all secrets in Secret Manager
* \[ ] Configure Firebase Hosting for Next.js (static export or Cloud Run)
* \[ ] Set up Cloud Build trigger (push to main → auto deploy)
* \[ ] Verify public demo URL is stable

Notifications\*\*

* \[ ] Configure Firebase Cloud Messaging
* \[ ] Build volunteer task acceptance page (public, no login)
* \[ ] Test full dispatch → SMS → accept flow end-to-end

Quality Pass\*\*

* \[ ] Mobile responsiveness check on all screens
* \[ ] Fix any visual regressions
* \[ ] Performance test: simulate 50 concurrent needs on heatmap
* \[ ] Check all error states (empty states, loading states, API failures)

Demo Recording\*\*

* \[ ] Record 2-minute demo video following Flow A (NGO Coordinator)
* \[ ] Capture: upload survey → processing animation → heatmap update → match → dispatch → confirmation



### 2.3 API Endpoint Reference

#### Backend: FastAPI (Python)

```
POST   /api/upload              Upload survey image → returns structured need JSON
GET    /api/needs               Get all needs (filter: ?status=open\\\&category=medical)
POST   /api/needs               Create new need (manual entry)
PATCH  /api/needs/{id}          Update need status
GET    /api/volunteers          Get all volunteers (filter: ?available=true\\\&skill=medical)
POST   /api/volunteers          Register new volunteer
POST   /api/match               Body: {need\\\_id} → returns ranked volunteers with scores
POST   /api/dispatch            Body: {need\\\_id, volunteer\\\_id} → sends notification
GET    /api/stats               Returns aggregated impact metrics for dashboard
GET    /api/health              Health check endpoint
```

#### Key Request/Response Schemas

```json
// POST /api/upload → response
{
  "need\\\_id": "need\\\_abc123",
  "location": "North Zone, Sector 4",
  "coordinates": {"lat": 22.5726, "lng": 88.3639},
  "needs": \\\[
    {
      "category": "medical",
      "description": "3 elderly residents need blood pressure medication",
      "urgency": 8.2,
      "affected\\\_count": 3,
      "contact": "Rahul Sharma, 9876543210"
    }
  ],
  "confidence": 0.91,
  "processing\\\_time\\\_ms": 4231
}

// POST /api/match → response
{
  "need\\\_id": "need\\\_abc123",
  "matches": \\\[
    {
      "volunteer\\\_id": "vol\\\_x7k",
      "name": "Dr. Priya Nair",
      "skills": \\\["medical", "first aid", "elder care"],
      "distance\\\_km": 1.8,
      "similarity\\\_score": 0.94,
      "availability": "available",
      "explanation": "Medical background matches blood pressure monitoring requirement. Located 1.8km away and currently available.",
      "reliability\\\_score": 4.8
    }
  ]
}
```

\---

### 2.4 Environment Variables Reference

```bash
# .env.local (frontend)
NEXT\\\_PUBLIC\\\_FIREBASE\\\_API\\\_KEY=
NEXT\\\_PUBLIC\\\_FIREBASE\\\_AUTH\\\_DOMAIN=
NEXT\\\_PUBLIC\\\_FIREBASE\\\_PROJECT\\\_ID=
NEXT\\\_PUBLIC\\\_FIREBASE\\\_STORAGE\\\_BUCKET=
NEXT\\\_PUBLIC\\\_FIREBASE\\\_MESSAGING\\\_SENDER\\\_ID=
NEXT\\\_PUBLIC\\\_FIREBASE\\\_APP\\\_ID=
NEXT\\\_PUBLIC\\\_GOOGLE\\\_MAPS\\\_API\\\_KEY=
NEXT\\\_PUBLIC\\\_API\\\_BASE\\\_URL=https://your-api.run.app

# .env (backend)
GOOGLE\\\_CLOUD\\\_PROJECT=your-project-id
GEMINI\\\_API\\\_KEY=
VERTEX\\\_AI\\\_LOCATION=us-central1
DOCUMENT\\\_AI\\\_PROCESSOR\\\_ID=
FIREBASE\\\_ADMIN\\\_CREDENTIALS=path/to/serviceAccount.json
TWILIO\\\_ACCOUNT\\\_SID=        # optional: SMS via Twilio
TWILIO\\\_AUTH\\\_TOKEN=
TWILIO\\\_FROM\\\_NUMBER=
SENDGRID\\\_API\\\_KEY=          # optional: Email notifications
```

\---

### 2.5 Firestore Data Schema

```
Collection: ngos
  Document: {ngo\\\_id}
    - name: string
    - logo\\\_url: string
    - admin\\\_uid: string
    - created\\\_at: timestamp

Collection: needs
  Document: {need\\\_id}
    - ngo\\\_id: string
    - location: string
    - coordinates: { lat: float, lng: float }
    - category: enum\\\[food, water, medical, shelter, education, livelihood]
    - description: string
    - urgency: float (1.0–10.0)
    - affected\\\_count: integer
    - contact: string
    - status: enum\\\[open, assigned, in\\\_progress, resolved]
    - source\\\_image\\\_url: string
    - embedding: array\\\[float]  (768 dimensions)
    - created\\\_at: timestamp
    - resolved\\\_at: timestamp | null
    - assigned\\\_volunteer\\\_id: string | null

Collection: volunteers
  Document: {volunteer\\\_id}
    - ngo\\\_id: string
    - name: string
    - phone: string
    - email: string
    - skills: array\\\[string]
    - languages: array\\\[string]
    - zones: array\\\[string]
    - coordinates: { lat: float, lng: float }
    - available: boolean
    - embedding: array\\\[float]  (768 dimensions)
    - reliability\\\_score: float
    - total\\\_tasks: integer
    - created\\\_at: timestamp

Collection: assignments
  Document: {assignment\\\_id}
    - need\\\_id: string
    - volunteer\\\_id: string
    - status: enum\\\[dispatched, accepted, declined, completed]
    - dispatched\\\_at: timestamp
    - accepted\\\_at: timestamp | null
    - completed\\\_at: timestamp | null
    - notes: string
```

\---

### 2.6 Deployment Commands (Copy-Paste Ready)

```bash
# === GOOGLE CLOUD SETUP ===
gcloud auth login
gcloud projects create sevasync-ai-2026 --name="sevasync AI"
gcloud config set project sevasync-ai-2026

# Enable required APIs
gcloud services enable \\\\
  run.googleapis.com \\\\
  cloudbuild.googleapis.com \\\\
  documentai.googleapis.com \\\\
  aiplatform.googleapis.com \\\\
  maps-backend.googleapis.com \\\\
  secretmanager.googleapis.com \\\\
  storage.googleapis.com

# === BACKEND: DEPLOY TO CLOUD RUN ===
cd backend
gcloud run deploy SevaSync-api \\\\
  --source . \\\\
  --platform managed \\\\
  --region us-central1 \\\\
  --allow-unauthenticated \\\\
  --memory 1Gi \\\\
  --cpu 1 \\\\
  --concurrency 80 \\\\
  --set-env-vars GOOGLE\\\_CLOUD\\\_PROJECT=communitypulse-2026

# === FRONTEND: DEPLOY TO FIREBASE HOSTING ===
cd frontend
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting  # select "dist" or "out" as public dir
firebase deploy --only hosting

# === SEED DEMO DATA ===
cd scripts
python seed\\\_demo\\\_data.py

# === ALTERNATIVE: DEPLOY FRONTEND TO VERCEL ===
npm install -g vercel
vercel --prod
# Set environment variables in Vercel dashboard → Settings → Environment Variables
```

\---

### 2.7 Testing Checklist

```
FLOW A — NGO Coordinator (must pass before demo)
  \\\[ ] Can log in with Google account
  \\\[ ] Can upload survey image (JPEG < 5MB)
  \\\[ ] Processing animation plays during Gemini call
  \\\[ ] Extracted need JSON appears with editable fields
  \\\[ ] Save creates pin on heatmap within 5 seconds
  \\\[ ] New need appears in needs table with correct urgency badge
  \\\[ ] Can click "Find Volunteers" from need detail
  \\\[ ] 5 ranked matches appear with scores and explanations
  \\\[ ] Can dispatch top match with one click
  \\\[ ] Confirmation modal shows SMS preview
  \\\[ ] Assignment saved in Firestore with status "dispatched"

FLOW B — Impact Dashboard
  \\\[ ] Dashboard loads in < 3 seconds
  \\\[ ] Metrics reflect current Firestore data
  \\\[ ] Category donut chart shows correct proportions
  \\\[ ] Date range filter updates all charts

FLOW C — Volunteer Task Link
  \\\[ ] Public task URL opens without login
  \\\[ ] Shows task details + map location
  \\\[ ] Accept button updates Firestore status to "accepted"
  \\\[ ] Coordinator receives confirmation notification

EDGE CASES
  \\\[ ] Upload non-image file → helpful error message
  \\\[ ] No volunteers available → "No volunteers in this zone" state
  \\\[ ] Network offline → cached heatmap shows + offline banner
  \\\[ ] Gemini API rate limit → retry with backoff + user message
```

\---

## PART 3 — NOTEBOOKLM PRESENTATION DECK PROMPT

Once your prototype is built, upload this PRD to NotebookLM along with your demo screenshots. Then use this prompt to generate your presentation deck:

```
Using all the source materials I have uploaded (PRD, architecture document, 
demo screenshots), generate a complete 12-slide Google Slides presentation 
for CommunityPulse AI. 

Format each slide exactly as:
SLIDE \\\[N]: \\\[Title]
HEADLINE: \\\[One punchy sentence — max 12 words]
BODY: \\\[3–5 bullet points OR 2–3 sentence narrative]
VISUAL: \\\[Describe exactly what image, chart, or diagram to show]
SPEAKER NOTES: \\\[What to say in 45–60 seconds, conversational tone]

Use this slide order:
1. Title: "CommunityPulse AI — Making Every Need Visible"
2. The Human Problem: A coordinator's story — 200 surveys, 4 hours, and 
   a family that didn't get help in time
3. The Scale: 840 million people rely on under-resourced NGOs. 
   Data fragmentation is the silent crisis.
4. Why Existing Tools Fail: Spreadsheets, WhatsApp, paper — why they 
   break at scale for community coordination
5. Our Solution: One sentence, one diagram — the 90-second loop
6. Google AI Stack: How Gemini, Vertex AI, Vision AI, and Maps power 
   each step of the platform
7. Live Demo Walkthrough: 4-screenshot sequence of the core flow
8. Impact Metrics: 10× faster triage, 3× match accuracy, 
   60% coordinator time saved
9. Real-World Validation: Pilot details — NGO name, surveys processed, 
   volunteers onboarded, needs resolved
10. Business Model: Freemium for NGOs under 50 volunteers, 
    paid tiers for larger organizations and government agencies
11. Roadmap: Phase 1 Prototype → Phase 2 5-NGO Pilot → Phase 3 Open API
12. Call to Action: "Join us in making invisible needs visible." 
    Team + contact + QR code to live demo

Tone: Inspiring but evidence-based. Every claim backed by a number. 
Every slide leaves the audience wanting the next one. 
Write as if presenting to Google leaders who care about both 
technical excellence and social impact.
```

\---

## QUICK REFERENCE CARD

|What|Where|
|-|-|
|Live demo URL|https://sevasync-2026.web.app|
|API base URL|https://sevasync-api-xxxx.a.run.app|
|Firebase console|https://console.firebase.google.com|
|GCP console|https://console.cloud.google.com|
|Gemini AI Studio|https://aistudio.google.com|
|Vertex AI console|https://console.cloud.google.com/vertex-ai|
|Demo video|/assets/demo\_v1.mp4|
|Submission form|developers.google.com/community/gdsc-solution-challenge|

\---

*Document version 1.0 · SevaSync AI · Solution Challenge 2026*

