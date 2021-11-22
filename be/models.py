from sqlalchemy import Column, String

from database import Base



class UserData(Base):

    __tablename__ = "userData"


    username = Column(String(255), primary_key=True, nullable=False)
    password = Column(String(255), nullable=False)
