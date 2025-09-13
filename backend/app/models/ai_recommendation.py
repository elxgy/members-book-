from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AIRecommendation(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    user_id: str
    recommendation_type: str
    recommendation_data: dict
    confidence_score: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_applied: bool = False
