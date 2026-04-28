import os
from typing import List
import numpy as np
from dotenv import load_dotenv

load_dotenv()

# For a real implementation, you would use:
# from google.cloud import aiplatform
# from vertexai.language_models import TextEmbeddingModel

def get_embedding(text: str) -> List[float]:
    """
    Generate a 768-dimensional embedding for the given text.
    In production, this calls Vertex AI text-embedding-004.
    For the prototype, we generate a deterministic pseudo-random vector.
    """
    # This is a mock implementation for the prototype
    # In a real scenario, use Vertex AI TextEmbeddingModel
    np.random.seed(hash(text) % (2**32))
    return np.random.uniform(-1, 1, 768).tolist()

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    """Calculate the cosine similarity between two vectors."""
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    return float(dot_product / (norm_v1 * norm_v2))
