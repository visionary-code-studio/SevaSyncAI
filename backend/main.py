from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload, needs, volunteers, match, dispatch, stats
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="SevaSync AI API",
    description="Smart Resource Allocation Backend for Solution Challenge 2026",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(upload.router, prefix="/api")
app.include_router(needs.router, prefix="/api")
app.include_router(volunteers.router, prefix="/api")
app.include_router(match.router, prefix="/api")
app.include_router(dispatch.router, prefix="/api")
app.include_router(stats.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "app": "SevaSync AI API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
