from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "visitors.db")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




def init_db():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS visitor_count (
            id INTEGER PRIMARY KEY,
            count INTEGER NOT NULL
        )
    """)

    cur.execute("SELECT * FROM visitor_count WHERE id = 1")
    row = cur.fetchone()

    if row is None:
        cur.execute("INSERT INTO visitor_count (id, count) VALUES (1, 0)")

    conn.commit()
    conn.close()


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def home():
    return {"message": "Visitor counter API is running"}





@app.get("/visitor-count")
@app.get("/visitor-count")
def visitor_count():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("SELECT count FROM visitor_count WHERE id = 1")
    count = cur.fetchone()[0]

    conn.close()
    return {"visitors": count}






@app.post("/visitor-visit")
def add_visitor():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("UPDATE visitor_count SET count = count + 1 WHERE id = 1")
    conn.commit()

    cur.execute("SELECT count FROM visitor_count WHERE id = 1")
    count = cur.fetchone()[0]

    conn.close()
    return {"visitors": count}





