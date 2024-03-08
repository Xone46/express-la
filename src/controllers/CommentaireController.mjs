
import { Commentaire } from "../models/commentaire.mjs";

const create = async (request, response) => {

    try {

        const { titreReserve, commentaires, observateurId } = request.body;

        const exist = await Commentaire.findOne({ titreReserve : titreReserve, observateurId : observateurId });
        if(exist) {
            await Commentaire.updateOne({observateurId : observateurId }, { $set : { commentaires : commentaires }})
            .then(() => {
                response.status(201).json({ msg: "Modifié avec succès" })
            })
            .catch((error) => {
                response.status(400).json(error);
            });

        } else {
            await Commentaire({ titreReserve, commentaires, observateurId })
            .save()
            .then(async (result) => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
                console.log(error)
            });
        }



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const select = async (request, response) => {

    try {

        const observateurId = String(request.body.observateurId);
        const titreReserve = String(request.body.titreReserve);

        const commentaire = await Commentaire.findOne({ observateurId : observateurId, titreReserve : titreReserve });
        response.status(200).json(commentaire);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select }