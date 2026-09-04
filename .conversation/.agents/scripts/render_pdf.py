import fitz
from pathlib import Path

pdf = Path("attached_assets/PRESENTATION_IMPORTANT_1788533119307.pdf")
out = Path(".agents/outputs/pdf_pages")
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
print(f"pages={len(doc)} metadata={doc.metadata}")
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = out / f"page-{i+1:02d}.png"
    pix.save(path)
    print(f"rendered={path} size={pix.width}x{pix.height}")
