import { Chekin } from "../models/chekins.mjs"
import geoip from 'geoip-lite'

const status = async (request, response) => {

    const { body : { ip } } = request;

    try {

        // get location Geo
        var geo = geoip.lookup(ip);
        // set Geo in collection -> chekins
        await Chekin(geo)
        .save()
        .then((result) => {
            response.status(200).json(result);
        })
        .catch((error) => {
            console.log(error)
            response.status(400).json(error);
        });

    } catch(error) {
        console.log(error);
        response.status(400).json(error);
    }

}

export default { status }