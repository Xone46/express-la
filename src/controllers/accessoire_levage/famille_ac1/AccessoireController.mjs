import { Accessoire } from "../../../models/accessoire_levage/famille_ac1/accessoire.mjs";

const create = async (request, response) => {

    await Accessoire(request.body)
    .save()
    .thne((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
}

export default { create }