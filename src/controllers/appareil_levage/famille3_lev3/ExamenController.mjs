
import { ExamenFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/examen.mjs";
import { Commentaire } from "../../../models/commentaire.mjs";
import { CompletedFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/examens/checkEmpty.mjs";



const create = async (request, response) => {
    
    try {

        const { a, b, c, d, e, f, g, h, i, j, k, observateurId } = request.body;
        
        const exist = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });
        if(exist) {

            await ExamenFamilleTreeLevTree.updateOne({ observateurId : observateurId }, { $set : { a : a, b : b, c : c, d : d, e : e, f : f, g : g, h : h, i : i, j : j, k : k }})
            .then(() => {
                response.status(201).json({ msg: "Modifié avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
            });

        } else {

            await ExamenFamilleTreeLevTree({ a, b, c, d, e, f, g, h, i, j, k, observateurId })
            .save()
            .then(async () => {

                await CompletedFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
                    $set: {
                        examen: true,
                    }
                })
                .then(() => {
                    response.status(201).json({ msg: "Enregistré avec succès" });
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

            })
            .catch((error) => {
                response.status(400).json(error);
            });
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const select = async (request, response) => {


    try {

        const observateurId = String(request.params.observateurId);
        const examen = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });
        if(examen) {
            response.status(200).json({ examen : examen });
        } 


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const reset = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        await ExamenFamilleTreeLevTree.deleteOne({ observateurId : observateurId })
        .then(async() => {
            
            await CompletedFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
                $set: {
                    examen: false,
                }
            })
            .then(async() => {
                await Commentaire.deleteMany({ observateurId : observateurId })
                .then(() => {
                    response.status(200).json({ msg : "Deleted Done!" });
                })
                .catch((error) => {
                    response.status(400).json(error);
                })
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

        })
        .catch((error) => {
            response.status(400).json(error);
        });


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const updateStatus = async (request, response) => {

    try {

        const observateurId = String(request.body.observateurId);
        const titreReserve = String(request.body.titreReserve);

        const res = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });

        const { a ,b ,c ,d ,e ,f ,g ,h ,i ,j, k } = res;

        a.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        b.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});

            }
        });

        c.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        d.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        e.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        f.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        g.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        h.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        i.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false; 
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        j.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });

        k.forEach(async (element) => {
            if(element.titre == titreReserve) {
                element.o = false;
                await Commentaire.deleteOne({ titreReserve : titreReserve, observateurId : observateurId});
            }
        });


        await ExamenFamilleTreeLevTree.updateOne({ observateurId : observateurId } , { $set : { a : a ,b : b ,c : c ,d : d ,e : e ,f : f ,g : g ,h : h ,i : i ,j : j, k : k }})
        .then((result) => {
            console.log(result);
            response.status(201).json({ msg: "Modifié avec succès" });
        })
        .catch((error) => {
            console.log(error);
            response.status(400).json(error);
        })

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const changeStatusCritique = async (request, response) => {

    try {

        const observateurId = String(request.body.observateurId);
        const titreReserve = String(request.body.titre);
        const statusCritique = Boolean(request.body.statusCritique);

        const res = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });

        const { a ,b ,c ,d ,e ,f ,g ,h ,i ,j, k } = res;

        a.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        b.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        c.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        d.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        e.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        f.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        g.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        h.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        i.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        j.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });

        k.forEach(element => {
            if(element.titre == titreReserve) {
                element.statusCritique = statusCritique;
            }
        });



        await ExamenFamilleTreeLevTree.updateOne({ observateurId : observateurId } , { $set : { a : a ,b : b ,c : c ,d : d ,e : e ,f : f ,g : g ,h : h ,i : i ,j : j, k : k }})
        .then((result) => {
            response.status(201).json({ msg: "Modifié avec succès" });
        })
        .catch((error) => {
            console.log(error);
            response.status(400).json(error);
        })

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create, select, updateStatus, changeStatusCritique, reset }