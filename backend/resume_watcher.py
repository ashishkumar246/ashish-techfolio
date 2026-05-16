import hashlib
from pathlib import Path

RESUME_PATH = Path("../assets/resume.pdf")
HASH_FILE = Path("data/resume_hash.txt")


def get_file_hash(file_path):
    file_bytes = file_path.read_bytes()
    return hashlib.sha256(file_bytes).hexdigest()


def has_resume_changed():
    current_hash = get_file_hash(RESUME_PATH)

    if not HASH_FILE.exists():
        return True

    old_hash = HASH_FILE.read_text()

    return current_hash != old_hash


def save_current_hash():
    HASH_FILE.parent.mkdir(exist_ok=True)
    current_hash = get_file_hash(RESUME_PATH)
    HASH_FILE.write_text(current_hash)


if __name__ == "__main__":
    if has_resume_changed():
        print("Resume changed")
        save_current_hash()
    else:
        print("Resume not changed")