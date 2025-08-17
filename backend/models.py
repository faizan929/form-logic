
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker, declarative_base



DATABASE_URL = "sqlite:///./users.db"

engine = create_engine(DATABASE_URL, connect_args = {"check_same_thread" : False})
# a session is an active connection to the database where one can query 
SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)
Base = declarative_base()   # this creates the db class

# User is the class
# this is orm: object relational mapping
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True)
    email = Column(String, unique = True)
    password = Column(String)


# create the table
Base.metadata.create_all(bind=engine)