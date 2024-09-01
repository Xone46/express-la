import { Chekin } from "../models/chekins.mjs"
import { Sauvegarde } from "../models/sauvegarde.mjs";
import geoip from 'geoip-lite'
import { spawn } from 'child_process';

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const status = async (request, response) => {

    const { body: { ip } } = request;

    try {
        // get location Geo
        var geo = geoip.lookup(ip);
        if (geo.range == "" || geo.country == "" || geo.region || geo.eu == "" || geo.timezone == "" || geo.city == "" || geo.ll == "" || geo.metro == "" || geo.area == "") {
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


    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }

}

const sauvgarde = async (request, response) => {

    const { inspecteurId } = request.params;

    const a = Math.floor(Math.random() * 8);
    const b = Math.floor(Math.random() * 10);

    try {

        const executePython = async (script, args) => {

            const arg = args.map(arg => arg.toString());
            const py = spawn("python", [script, ...arg]);

            if(py) {
                return true;
            }
        }

        const result = await executePython('python/sauvgarder.py', [a, b]);

        if(result) {

            await Sauvegarde({
                inspecteurId : inspecteurId
            })
            .save()
            .then(async () => {
                response.status(200).json(true);
            })
            .catch((error) => {
                response.status(400).json(error);
            });
            
        }

    } catch (error) {
        console.log(error.message);
        response.status(400).json(error);
    }
}

export default { status, sauvgarde }