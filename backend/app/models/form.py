from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Form(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    name: str
    description: str
    fields: List[str]
    created_by: str  # Admin user ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
