from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Message(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    sender_id: str
    receiver_id: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str # 'sent', 'delivered', 'read'
    read_at: Optional[datetime] = None
