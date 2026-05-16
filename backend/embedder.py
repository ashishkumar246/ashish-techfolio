from sentence_transformers import SentenceTransformer
from chunker import get_resume_chunks

model = SentenceTransformer("all-MiniLM-L6-v2")

chunks = get_resume_chunks()

for section, content in chunks.items():
    embedding = model.encode(content)

    print("SECTION:", section)
    print("TEXT PREVIEW:", content[:100])
    print("VECTOR SIZE:", len(embedding))
    print("-" * 50)