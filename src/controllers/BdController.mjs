
import { Bd } from "../models/bd.mjs"

import { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } from 'mongodb-snapshot';
import fs from 'fs';

const sauvegarder = async (request, response) => {
    try {
            const date = new Date();
            await Bd({
                date : date
            })
            .save()
            .then(async (result) => {

                const backupId = String(result._id);

                const backupDir = './backups';
                if (!fs.existsSync(backupDir)) {
                    fs.mkdirSync(backupDir);
                } 
        
                const mongoConnector = new MongoDBDuplexConnector({
                    connection: {
                        uri: 'mongodb://localhost:27017/control',
                        dbname: 'control',
                    },
                });
        
                const fileConnector = new LocalFileSystemDuplexConnector({
                    connection: {
                        path: './backups/backup.tar',
                        path: `./backups/${backupId}.tar`,
                    },
                });
        
                const transferer = new MongoTransferer({
                    source: mongoConnector,
                    targets: [fileConnector],
                });
        
                for await (const { total, write } of transferer) {
                    console.log(`Bytes restants à écrire : ${total - write}`);
                }
        
                response.status(200).json(result);
            })
            .catch((error) => {
                response.status(400).json(error);
            });

        

    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
        response.status(500).json({ success: false, error: error.message });
    }
};

const restaurer = async (request, response) => {
    try {
        const mongoConnector = new MongoDBDuplexConnector({
            connection: {
                uri: 'mongodb://localhost:27017/control',
                dbname: 'control',
            },
        });

        const fileConnector = new LocalFileSystemDuplexConnector({
            connection: {
                path: './backups/backup.tar',
            },
        });

        const transferer = new MongoTransferer({
            source: fileConnector,
            targets: [mongoConnector],
        });

        for await (const { total, write } of transferer) {
            console.log(`Bytes restants à écrire : ${total - write}`);
        }

        response.status(200).json({ success: true, message: "Restauration effectuée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la restauration :", error);
        response.status(500).json({ success: false, error: error.message });
    }
};


const read = async (request, response) => {
    try {
        const backups = await Bd.find().sort({ date : -1})
        response.status(200).json({ backups: backups });
    } catch (error) {
        console.error("Erreur lors de lire liste des sauvegardes :", error);
        response.status(500).json({ success: false, error: error.message });
    }
};

export default { sauvegarder, restaurer ,read }