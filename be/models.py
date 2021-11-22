from sqlalchemy import Column, String

from database import Base



class UserData(Base):

    __tablename__ = "userData"


    username = Column(String, primary_key=True)
    password = Column(String)
