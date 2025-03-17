from spire.doc import *
from spire.doc.common import *
import os

current_file = os.path.abspath(__file__)
base_dir = os.path.dirname(current_file)  # => express-la/python
base_dir = os.path.dirname(base_dir)      # => express-la

target_file = os.path.join(base_dir, "src", "rapports", "output.docx")

# Create word document
document = Document()

# Load a doc or docx file
document.LoadFromFile(target_file)

#Save the document to PDF
document.SaveToFile("src/rapports/output-tow.pdf", FileFormat.PDF)
document.Close()


a = int(sys.argv[1])
b = int(sys.argv[2])
c = a / b
print(c)
sys.stdout.flush()
