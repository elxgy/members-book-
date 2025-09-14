from pydantic import BaseModel, Field
from datetime import datetime

class Deal(BaseModel):
    deal_id: str
    description: str
    value: float
    date: datetime = Field(default_factory=datetime.utcnow)
