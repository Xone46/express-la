import os
import io
import sys
from pypdf import PdfWriter, PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

# ✅ Activer l'encodage UTF-8 pour la console
sys.stdout.reconfigure(encoding='utf-8')

# 🔥 Chemins
input_folder = r"C:\Users\DELL\Desktop\pdf"
output_folder = r"C:\Users\DELL\Desktop\pdf-crypte"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# ✅ Créer une watermark (en arrière-plan)
def create_watermark():
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)

    # ✅ Définir la couleur bleue et la transparence
    c.setFillColorRGB(0.2, 0.4, 0.8)  # Bleu clair (RVB)
    c.setFillAlpha(0.3)               # Transparence à 30%

    # ✅ Taille et rotation du texte
    c.setFont("Helvetica-Bold", 100)
    width, height = letter
    c.saveState()
    c.translate(width / 2, height / 2)  # Centrer le texte
    c.rotate(40)                        # Rotation à 45°
    c.drawCentredString(0, 0, "GTHCONSULT")
    c.restoreState()

    c.save()
    buffer.seek(0)
    return PdfReader(buffer)

# ✅ Créer le watermark une seule fois
watermark = create_watermark()

# ✅ Parcourir tous les fichiers PDF
for filename in os.listdir(input_folder):
    if filename.endswith(".pdf"):
        input_file = os.path.join(input_folder, filename)
        output_file = os.path.join(output_folder, filename)

        reader = PdfReader(input_file)
        writer = PdfWriter()

        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]

            # ✅ Ajouter la watermark en arrière-plan
            watermark_page = watermark.pages[0]
            page.merge_page(watermark_page)

            writer.add_page(page)

        # 🔒 Protéger le PDF (autoriser l'impression uniquement)
        writer.encrypt(
            user_password="",              # Aucun mot de passe utilisateur
            owner_password="owner123",     # Mot de passe propriétaire
            use_128bit=True,
            permissions_flag=4             # 🔥 Permet uniquement l'impression
        )

        # ✅ Écrire le fichier de sortie
        with open(output_file, "wb") as f:
            writer.write(f)

        # ✅ ✅ ✅ Affichage avec symboles Unicode
        print(f"✅ {filename} → 🚀 Protégé avec watermark et sécurité")

print("\n🎉 Tous les fichiers PDF sont proteges")