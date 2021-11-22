from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker


#SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
DATABASE_URL = 'postgresql://merv:123@localhost:5432/authuser'

engine = create_engine(
    DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()