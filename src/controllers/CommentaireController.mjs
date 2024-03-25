
import { Commentaire } from "../models/commentaire.mjs";

const create = async (request, response) => {

    try {

        const { observateurId, ref, number, titre, modelSelected } = request.body;

        const exist = await Commentaire.findOne({ observateurId : observateurId, ref : ref, number : number, titre : titre });
        if(exist) {
            await Commentaire.updateOne({observateurId : observateurId }, { $set : { ref : ref, number : number, titre : titre, modelSelected :modelSelected }})
            .then(() => {
                response.status(201).json({ msg: "Modifié avec succès" })
            })
            .catch((error) => {
                response.status(400).json(error);
            });

        } else {
            await Commentaire({ observateurId, ref, number, titre, modelSelected })
            .save()
            .then(() => {
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

        const { observateurId, ref, number, titre } = request.body;

        const commentaire = await Commentaire.findOne({ observateurId : observateurId, ref : ref, number : number, titre : titre });
        if(commentaire) {
            response.status(200).json(commentaire);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select }