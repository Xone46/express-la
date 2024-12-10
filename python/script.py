from spire.doc import *
from spire.doc.common import *
# Create word document
document = Document()
# Load a doc or docx file
document.LoadFromFile("C:\\Users\\DELL\\Desktop\\Projects\\Tablet\\express-la\\src\\rapports\\output.docx")
#Save the document to PDF
document.SaveToFile("src/rapports/output-tow.pdf", FileFormat.PDF)
document.Close()


a = int(sys.argv[1])
b = int(sys.argv[2])
c = a / b
print(c)
sys.stdout.flush()
