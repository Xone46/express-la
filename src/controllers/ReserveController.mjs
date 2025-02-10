import { Reserve } from '../models/reserves.mjs';


const read = async (request, response) => {

    try {
        const reserves = await Reserve.find();
        if(reserves) {
            response.status(200).json(reserves);
        }

    } catch(error) {
        response.status(400).json(error);
    }
}


export default { read }