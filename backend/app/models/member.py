from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum

class UserType(str, Enum):
    MEMBER = "member"
    ADMIN = "admin"
    GUEST = "guest"

class Tier(str, Enum):
    DISRUPTION = "Disruption"
    INFINITY = "Infinity"
    SOCIO = "Sócio"

class ContactInfo(BaseModel):
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None

class Member(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    name: str = Field(..., description="Member's full name")
    email: EmailStr = Field(..., description="Member's email address")
    password_hash: str = Field(..., description="Hashed password")
    password_plain: Optional[str] = Field(None, description="Plain text password for development")
    tier: Optional[Tier] = Field(None, description="Member tier level")
    contact_info: Optional[ContactInfo] = Field(None, description="Contact information")
    profile_image_url: Optional[str] = Field(None, description="Profile image URL")
    user_type: UserType = Field(UserType.MEMBER, description="User type")
    created_at: Optional[datetime] = Field(None, description="Account creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    last_login: Optional[datetime] = Field(None, description="Last login timestamp")
    is_active: bool = Field(True, description="Account active status")
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }
        
    def to_dict(self) -> Dict[str, Any]:
        """Convert model to dictionary for MongoDB storage"""
        data = self.model_dump(by_alias=True, exclude_none=True)
        if 'id' in data and data['id'] is None:
            del data['id']
        return data
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Member':
        """Create model from MongoDB document"""
        if '_id' in data:
            data['_id'] = str(data['_id'])
        return cls(**data)