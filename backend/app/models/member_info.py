from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from .deal import Deal

class MemberInfo(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    user_id: str  # Reference to the user in the members collection
    name: str
    email: EmailStr
    company: Optional[str] = None
    sector: Optional[str] = None
    hierarchy: Optional[str] = None
    photo: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    instagram: Optional[str] = None
    website: Optional[str] = None
    title: Optional[str] = None
    expertise: Optional[List[str]] = None
    connections: Optional[int] = None

    # Add business statistics fields
    negocios_fechados: Optional[int] = None
    valor_total: Optional[float] = None
    indicacoes_recebidas: Optional[int] = None
    valor_total_por_indicacao: Optional[float] = None
    indicacoes_fornecidas: Optional[int] = None
    valor_total_acumulado: Optional[float] = None

    deals: Optional[List[Deal]] = None

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)