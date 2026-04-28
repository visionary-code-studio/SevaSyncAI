import os
import json
from typing import List, Dict, Any, Optional
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

class FirebaseService:
    def __init__(self):
        self.db = None
        self.use_local = True
        self.local_file = "local_db.json"
        
        # Initialize local storage if it doesn't exist
        if not os.path.exists(self.local_file):
            with open(self.local_file, "w") as f:
                json.dump({"needs": [], "volunteers": [], "assignments": []}, f)
        
        try:
            cred_path = os.getenv("FIREBASE_ADMIN_CREDENTIALS")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                # Check if app is already initialized
                if not firebase_admin._apps:
                    firebase_admin.initialize_app(cred)
                self.db = firestore.client()
                self.use_local = False
                print("Connected to Firebase Firestore.")
            else:
                print("Firebase credentials not found. Using local JSON storage.")
        except Exception as e:
            print(f"Error connecting to Firebase: {e}. Using local JSON storage.")

    def _get_local_data(self) -> Dict[str, Any]:
        with open(self.local_file, "r") as f:
            return json.load(f)

    def _save_local_data(self, data: Dict[str, Any]):
        with open(self.local_file, "w") as f:
            json.dump(data, f, indent=2, default=str)

    async def get_needs(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        try:
            if not self.use_local and self.db:
                query = self.db.collection("needs")
                if category:
                    query = query.where("category", "==", category)
                docs = query.stream()
                return [doc.to_dict() | {"id": doc.id} for doc in docs]
        except Exception as e:
            print(f"Firestore get_needs error: {e}. Falling back to local.")
        
        data = self._get_local_data()
        needs = data["needs"]
        if category:
            needs = [n for n in needs if n["category"] == category]
        return needs

    async def create_need(self, need_data: Dict[str, Any]) -> str:
        try:
            if not self.use_local and self.db:
                _, doc_ref = self.db.collection("needs").add(need_data)
                return doc_ref.id
        except Exception as e:
            print(f"Firestore create_need error: {e}. Falling back to local.")
            
        data = self._get_local_data()
        need_id = f"need_{len(data['needs']) + 1}"
        need_data["id"] = need_id
        need_data["created_at"] = datetime.now().isoformat()
        data["needs"].append(need_data)
        self._save_local_data(data)
        return need_id

    async def get_volunteers(self, available: bool = True) -> List[Dict[str, Any]]:
        try:
            if not self.use_local and self.db:
                query = self.db.collection("volunteers").where("available", "==", available)
                docs = query.stream()
                return [doc.to_dict() | {"id": doc.id} for doc in docs]
        except Exception as e:
            print(f"Firestore get_volunteers error: {e}. Falling back to local.")
            
        data = self._get_local_data()
        volunteers = data["volunteers"]
        if available:
            volunteers = [v for v in volunteers if v.get("available", True)]
        return volunteers

    async def add_volunteer(self, volunteer_data: Dict[str, Any]) -> str:
        if not self.use_local:
            _, doc_ref = self.db.collection("volunteers").add(volunteer_data)
            return doc_ref.id
        else:
            data = self._get_local_data()
            v_id = f"vol_{len(data['volunteers']) + 1}"
            volunteer_data["id"] = v_id
            data["volunteers"].append(volunteer_data)
            self._save_local_data(data)
            return v_id

firebase_service = FirebaseService()
