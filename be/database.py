from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker, scoped_session


#SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
user_name = "merv"
password = "password"
host = "db"
database_name = "db"

DATABASE_URL = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    user_name,
    password,
    host,
    database_name,
)

engine = create_engine(
    DATABASE_URL,
    encoding="utf-8",
    echo=True
)
SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()

Base.query = SessionLocal.query_property()