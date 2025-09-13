from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class ValidateValues(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    user_id: str
    request_type: str  # 'new_deal', 'update_deal'
    data: Dict[str, Any]
    status: str = 'pending'  # 'pending', 'approved', 'rejected'
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
