import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongodbSnapshot = require('mongodb-snapshot');
const Backup = mongodbSnapshot.default || mongodbSnapshot;

const sauvgarder = async (request, response) => {
    try {
        const backup = new Backup({
            uri: 'mongodb://localhost:27017/control', // Utilisation de ta base de données
            root: './backups' // Dossier où les sauvegardes seront stockées
        });

        await backup.dump(); // Crée un snapshot de la base de données
        response.status(200).json({ success: true, message: "Sauvegarde effectuée avec succès" });

        console.log("sauvegarder");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
        response.status(500).json({ success: false, error: error.message });
    }
};

const restorer = async (request, response) => {
    try {
        const backup = new Backup({
            uri: 'mongodb://localhost:27017/control', 
            root: './backups'
        });

        await backup.restore(); // Restaure le dernier snapshot
        response.status(200).json({ success: true, message: "Restauration effectuée avec succès" });

        console.log("restorer");
    } catch (error) {
        console.error("Erreur lors de la restauration :", error);
        response.status(500).json({ success: false, error: error.message });
    }
};

export default { sauvgarder, restorer };
