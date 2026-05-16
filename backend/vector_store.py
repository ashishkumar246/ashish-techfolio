import chromadb
from sentence_transformers import SentenceTransformer
from chunker import get_resume_chunks


def build_vector_store():
    client = chromadb.PersistentClient(path="chroma_db")

    collection = client.get_or_create_collection(
        name="resume_chunks"
    )

    model = SentenceTransformer("all-MiniLM-L6-v2")

    chunks = get_resume_chunks()

    for section, content in chunks.items():
        embedding = model.encode(content).tolist()

        collection.upsert(
            ids=[section],
            embeddings=[embedding],
            documents=[content],
            metadatas=[{"section": section}]
        )

        print(f"Stored/Updated: {section}")

    print("All chunks stored successfully")


if __name__ == "__main__":
    build_vector_store()