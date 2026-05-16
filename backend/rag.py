import os
from dotenv import load_dotenv
import google.generativeai as genai
from retriever import retrieve_resume_context

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def answer_question(question):
    context = retrieve_resume_context(question)

    prompt = f"""
You are Ashish Kumar's portfolio assistant.
Answer the user's question using only the resume context below.

Resume context:
{context}

User question:
{question}

Answer:
"""

    response = model.generate_content(prompt)
    return response.text


if __name__ == "__main__":
    question = "FastAPI CRUD Service Weather News Chatbot projects"
    result = answer_question(question)
    print(result)