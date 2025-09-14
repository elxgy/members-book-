from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from decimal import Decimal

class RequestType(str, Enum):
    DEAL_COUNT = "deal_count"
    DEAL_VALUE = "deal_value"
    BOTH = "both"

class RequestStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class ValueRequest(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    member_id: str = Field(..., description="ID of the member making the request")
    request_type: RequestType = Field(..., description="Type of request: deal_count, deal_value, or both")
    
    # Current values (for reference)
    current_deal_count: Optional[int] = Field(None, description="Current number of deals")
    current_deal_value: Optional[Decimal] = Field(None, description="Current total deal value")
    
    # Requested values
    requested_deal_count: Optional[int] = Field(None, description="Requested number of deals")
    requested_deal_value: Optional[Decimal] = Field(None, description="Requested total deal value")
    
    # Request details
    justification: str = Field(..., description="Member's explanation for the request")
    
    # Verification status
    verified: bool = Field(default=False, description="Whether the request has been verified by admin")
    status: RequestStatus = Field(default=RequestStatus.PENDING, description="Current status of the request")
    
    # Admin fields
    admin_notes: Optional[str] = Field(None, description="Admin notes about the request")
    verified_by: Optional[str] = Field(None, description="ID of the admin who verified the request")
    verified_at: Optional[datetime] = Field(None, description="Timestamp when the request was verified")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, description="When the request was created")
    updated_at: datetime = Field(default_factory=datetime.utcnow, description="When the request was last updated")
    
    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            Decimal: lambda v: float(v)
        }
        
    def mark_as_verified(self, admin_id: str, status: RequestStatus, notes: Optional[str] = None):
        """Mark the request as verified by an admin"""
        self.verified = True
        self.status = status
        self.verified_by = admin_id
        self.verified_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        if notes:
            self.admin_notes = notes
    
    def update_request(self, **kwargs):
        """Update request fields and timestamp"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.updated_at = datetime.utcnow()