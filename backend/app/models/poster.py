from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime
from ..db.session import Base

class Poster(Base):
    __tablename__ = "posters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    thumbnail = Column(String(1024), nullable=True)
    location = Column(String(100), nullable=False, default="Homepage Hero")
    status = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
