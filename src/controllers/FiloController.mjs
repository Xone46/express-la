import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import XLSX from 'xlsx'

const read = async (req, res) => {
  
  try {

    const filename = path.resolve(__dirname, `../dbs/liste_categories.xlsx`);
    const file = XLSX.readFile(filename);
    let data = [];

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
      const temp = XLSX.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push({
              a : res.a,
              b : res.b
            })
        });
    }

    res.json(data).status(200);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the readed file' });
  }
}

export default { read }