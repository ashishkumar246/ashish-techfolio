from pypdf import PdfReader

pdf_path = "../assets/resume.pdf"

reader = PdfReader(pdf_path)

text = ""

for page in reader.pages:
    text += page.extract_text()

