from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class Member(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    name: str
    email: EmailStr
    password_hash: str
    tier: str # 'Disruption', 'Infinity', 'Sócio'
    contact_info: dict
    profile_image_url: Optional[str] = None
    description: Optional[str] = None
    user_type: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    is_active: bool = True
