import { Photo } from "../models/photo.mjs";

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        console.log(observateurId)
        const photo = await Photo.findOne({ observateurId : observateurId });
        console.log(photo)
        response.status(200).json(photo);

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { select }