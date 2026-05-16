from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "RAG backend is working"}

@app.post("/ask")
def ask_question(request: QuestionRequest):
    from rag import answer_question

    answer = answer_question(request.question)
    return {"answer": answer}
    
    