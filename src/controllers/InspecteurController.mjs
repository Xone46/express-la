import { Inspecteur } from "../models/inspecteurs.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"

const connexion = async (request, response) => {

    try {
        
        const result = validationResult(request);

        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);

        const inspecteur = await Inspecteur.findOne({ email : data.email });
        
        if(inspecteur == null) {
            return response.status(404).send({ msg : "Not found" });
        }

        if(inspecteur.password == data.password) {

            response.status(200).json({
                id : inspecteur._id,
                nom : inspecteur.nom,
                prenom : inspecteur.prenom
            });

        } else {
            return response.status(401).send({ msg : "Password not correct" });
        }



    } catch(error) {
        console.log(`Eroor : ${error}`);
        response.status(400).json(error);
    }

}

export default { connexion }