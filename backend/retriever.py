import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_collection(
    name="resume_chunks"
)

model = SentenceTransformer("all-MiniLM-L6-v2")

def retrieve_resume_context(question):
    question_embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=4
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = ""

    for doc, metadata in zip(documents, metadatas):
        context += f"\nSECTION: {metadata['section']}\n"
        context += doc
        context += "\n"

    return context


if __name__ == "__main__":
    question = "FastAPI CRUD Service Weather News Chatbot projects"
    context = retrieve_resume_context(question)
    print(context)














