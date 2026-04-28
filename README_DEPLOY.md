# SevaSync AI - Deployment Guide (Google Cloud)

This guide provides the exact commands to deploy your platform to Google Cloud Run.

## 1. Prerequisites
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized (`gcloud init`).
- Billing enabled for your project.

## 2. Deploy Backend (FastAPI)
Navigate to the `backend` directory and run:
```bash
cd backend
gcloud run deploy sevasync-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=sevasync-ai-bf2bd"
```

## 3. Deploy Frontend (Next.js)
Navigate to the `frontend` directory and run:
```bash
cd frontend
gcloud run deploy sevasync-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NEXT_PUBLIC_API_BASE_URL=https://[YOUR-BACKEND-URL]"
```
*(Replace `[YOUR-BACKEND-URL]` with the URL provided by the backend deployment above.)*

## 4. Security Note
Your `.env.local` and `serviceAccountKey.json` are **NOT** in GitHub. You must manually add these secrets to Google Cloud Run "Secrets" or inject them as Environment Variables in the Google Cloud Console for the production services to function.
