from pdf_reader import text


KNOWN_HEADINGS = [
    "PROFILE",
    "TECHNICAL SKILLS",
    "AI/GENAI SKILLS",
    "PROJECTS",
    "PROFESSIONAL EXPERIENCE",
    "INTERNSHIP EXPERIENCE",
    "ADDITIONAL TECHNICAL & COMMUNITY EXPERIENCE",
    "EDUCATION",
]


def is_heading(line):
    cleaned_line = line.strip().upper()
    return cleaned_line in KNOWN_HEADINGS

lines = text.splitlines()





sections = {}

current_heading = None
for line in lines:
    clean_line = line.strip()

    if not clean_line:
        continue

    if is_heading(clean_line):
        current_heading = clean_line.upper()
        sections[current_heading] = []
    elif current_heading:
        sections[current_heading].append(clean_line)
final_chunks = {}

for heading, content_lines in sections.items():
    combined_text = "\n".join(content_lines)

    final_chunks[heading] = combined_text

def get_resume_chunks():
    return final_chunks


if __name__ == "__main__":
    print(get_resume_chunks())