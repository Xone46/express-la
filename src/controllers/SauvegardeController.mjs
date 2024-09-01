import { Sauvegarde } from "../models/sauvegarde.mjs";


const deleteOne = async (request, response) => {

    const inspecteurId = String(request.params.inspecteurId);
    await Sauvegarde.deleteOne({ inspecteurId : inspecteurId });
    res.status(200).json(true); 

}


export default { deleteOne }