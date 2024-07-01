import { Chekin } from "../models/chekins.mjs"
import geoip from 'geoip-lite'

const status = async (request, response) => {


    console.log(request);
    
    const { body : { ip } } = request;

    try {

        // get location Geo
        var geo = geoip.lookup(ip);
        if(geo.range == "" || geo.country == "" || geo.region || geo.eu == "" || geo.timezone == "" || geo.city == "" || geo.ll == "" || geo.metro == "" || geo.area == "") {
            response.status(200).json(true);
        } else {
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
        }


    } catch(error) {
        console.log(error);
        response.status(400).json(error);
    }

}

export default { status }