# SevaSync AI: Visual Architecture & Diagrams

## 1. System Architecture Diagram
This diagram illustrates the flow of data across the tech stack, highlighting the integration of Google Cloud AI services.

```mermaid
graph TD
    subgraph "Frontend (Next.js 14)"
        A[Web Client] --> B[Firebase Auth]
        A --> C[UI Components / shadcn]
        A --> D[Google Maps JS SDK]
    end

    subgraph "Backend (FastAPI / Cloud Run)"
        E[FastAPI Router] --> F[Gemini 1.5 Pro Service]
        E --> G[Vertex AI Embedding Service]
        E --> H[Firebase Admin SDK]
    end

    subgraph "Persistence & Auth (Firebase)"
        I[(Firestore Real-time DB)]
        J[Firebase Authentication]
    end

    subgraph "Google AI & Services"
        K[Gemini 1.5 Pro - OCR/Extraction]
        L[Vertex AI - text-embedding-004]
        M[Cloud Messaging - SMS/Push]
    end

    A <--> E
    E <--> I
    F <--> K
    G <--> L
    E --> M


## 2.Process-Flow Diagram(The 90-Second Loop)
sequenceDiagram
    participant C as NGO Coordinator
    participant B as FastAPI Backend
    participant G as Gemini 1.5 Pro
    participant F as Firestore
    participant V as Vertex AI
    participant VOL as Volunteer

    C->>B: Upload Survey Image
    B->>G: Process Image (OCR + Extraction)
    G-->>B: Structured JSON (Need + Urgency)
    B->>F: Store Need & Update Heatmap
    F-->>C: Real-time Map Update
    C->>B: Request Match for Need
    B->>V: Compute Similarity (Need vs Volunteers)
    V-->>B: Ranked Volunteer List
    B-->>C: Show Matches with AI Reasoning
    C->>B: Confirm Dispatch
    B->>VOL: Send SMS/Push Notification
    VOL->>F: Accept Task & Update Status


## 3. 
A. NGO Coordinator Dashboard
High-level layout of the central mission control.
graph TD
    subgraph "UI: Mission Control"
        N1[Sidebar Nav]
        H1[Header: Stats & Profile]
        M1[Main Content Area]
        subgraph "Grid Layout"
            G1[Live Urgency Heatmap]
            G2[Active Needs Table]
            G3[Volunteer Status Feed]
        end
    end

B. AI Matching Screen 
The interface where semantic matching happens.
graph LR
    subgraph "UI: Semantic Dispatch"
        Target[Selected Need Card]
        Target --> MatchList[AI-Ranked Volunteers]
        subgraph "Volunteer Card"
            V1[Similarity Score %]
            V2[AI Explanation Text]
            V3[Dispatch Button]
        end
    end

C. Volunteer Dispatch Card
graph LR
    subgraph "AI Match Card"
        Name[Volunteer Name]
        Score[Match Score: 98%]
        Reason[AI Reason: Medical Expert]
        Action[Dispatch Button]
    end

Created for: SevaSyncAI
Created by: Visionary_Coders Team
Lead by: Vaibhav Shaw


### Summary of what I did:
*   **Architecture Diagram:** Created a Mermaid graph showing the interaction between Next.js, FastAPI, Firebase, and Google AI services.
*   **Process-Flow Diagram:** Mapped out the sequential logic of the survey-to-dispatch loop.
*   **Wireframe Diagrams:** Defined the UI structure for the core screens.
*   **High-Fidelity Mockup:** Used `generate_image` to create a stunning visual of the dashboard for your presentation.

These assets provide a complete visual package for your **Project Winning Presentation Deck**. Do you need any more specific diagrams or perhaps a "Before vs After" flow comparison?

