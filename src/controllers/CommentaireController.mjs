
import { Commentaire } from "../models/commentaire.mjs";
import { Observateur } from "../models/observateur.mjs";
import { ExamenFamilleOneLevOne } from "../models/appareil_levage/famille1_lev1/examen.mjs";
import { ExamenFamilleTowLevTow } from "../models/appareil_levage/famille2_lev2/examen.mjs";
import { ExamenFamilleTreeLevTree } from "../models/appareil_levage/famille3_lev3/examen.mjs";
import { ExamenFamilleFourLevFour } from "../models/appareil_levage/famille4_lev4/examen.mjs";
import { ExamenFamilleFiveLevFive } from "../models/appareil_levage/famille5_lev5/examen.mjs";


const deleteByIndexAndRef = async (request, response) => {

    const { ref, number, titre, index, observateurId } = request.params;

    const commentaire = await Commentaire.findOne({ observateurId : observateurId, ref : ref, number : Number(number) });

    if(commentaire) {

        if(commentaire.modelSelected.length == 1) {

            await Commentaire.deleteOne({ observateurId : observateurId, ref : ref, number : Number(number) })
            .then(() => {
                response.status(201).json(true);
            })
            .catch((error) => {
                response.status(400).json(error);
            });
        } 

        if(commentaire.modelSelected.length > 1) {

            commentaire.modelSelected.splice(index, 1);

            await Commentaire.updateOne({ observateurId : observateurId, ref : ref, number : Number(number) }, { $set : { modelSelected : commentaire.modelSelected }})
            .then(() => {
                response.status(201).json(true);
            })
            .catch((error) => {
                response.status(400).json(error);
            });
        } 
    }

}

const create = async (request, response) => {


    const { observateurId, ref, number, titre, modelSelected } = request.body;

    if(modelSelected.length > 0) {
        
        for(let i = 0; i < modelSelected.length; i++) {
            modelSelected[i]["etat"] = "saved";
        }

        try {


            const exist = await Commentaire.findOne({ observateurId : observateurId, ref : ref, number : number });
    
            if(exist != null) {
    
                await Commentaire.updateOne({observateurId : observateurId }, { $set : { ref : ref, number : number, titre : titre, modelSelected :modelSelected }})
                .then(() => {
                    response.status(201).json(true)
                })
                .catch((error) => {
                    response.status(400).json(error);
                });
    
            }
            
            if(exist == null) {
    
                await Commentaire({ observateurId, ref, number, titre, modelSelected })
                .save()
                .then(() => {
                    response.status(201).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
    
            }
    
    
    
        } catch (error) {
            console.log(error.message)
            response.status(400).json(error);
        }
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

const deleteOne = async (request, response) => {

    try {

        const { commentaireId } = request.params;
        const commentaire = await Commentaire.deleteOne({ _id : commentaireId });
        if(commentaire) {
            response.status(200).json(commentaire);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const readCommentaires = async (request, response) => {

    try {
        const { observateurId } = request.params;
        const commentaire = await Commentaire.find({ observateurId : observateurId });
        if(commentaire) {
            console.log(commentaire)
            response.status(200).json(commentaire);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const deleteByRefAndObservateurId = async (request, response) => {

    try {
        const { observateurId, ref } = request.params;
        const commentaire = await Commentaire.deleteOne({ ref : ref, observateurId : observateurId });
        if(commentaire) {
            console.log(commentaire)
            response.status(200).json(true);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const supprimer = async (request, response) => {


    try {
        
        const {                 
            titre,
            ref,
            name,
            observateurId
        } = request.body;

        const refFix = String(ref).toLowerCase();

        const commentaire = await Commentaire.findOne({ observateurId : observateurId, ref : ref });

        // search commentaire specfique
        for(let i = 0; i < commentaire.modelSelected.length; i++) {
            if(commentaire.modelSelected[i].name == name) {
                commentaire.modelSelected.splice(i, 1);
            }
        } 


        // Modfier que exite au moins un valeur
        if(Number(commentaire.modelSelected.length) != 0) {

            await Commentaire.updateOne({ observateurId: observateurId }, {
                $set: {
                    "modelSelected": commentaire.modelSelected,
                }
            })
            .then(() => {
                response.status(200).json(true);
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
        }

        if(Number(commentaire.modelSelected.length) == 0) {


            const observateur = await Observateur.findById(observateurId);

            if(observateur.typeAppareil[0] == "Famille 1 LEV1") {

                const examen = await ExamenFamilleOneLevOne.findOne({ observateurId : observateurId });

                const commentaire = await Commentaire.deleteOne({ observateurId: observateurId, ref : ref });

                if(commentaire.deletedCount == 1) {
                    for(let i = 0; i < examen[refFix].length; i++) {
                        if(examen[refFix][i].titre == titre) {
                            examen[refFix][i]["o"] = false;
                        }
                    }
                }

                await ExamenFamilleOneLevOne.updateOne({ observateurId: observateurId }, {
                    $set: {
                        a : examen.a,
                        b : examen.b,
                        c : examen.c,
                        d : examen.d,
                        e : examen.e,
                        f : examen.f,
                        g : examen.g,
                        h : examen.h,
                        i : examen.i,
                        j : examen.j,
                        k : examen.k,
                    }
                })
                .then(() => {
                    response.status(200).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            }

            if(observateur.typeAppareil[0] == "Famille 2 LEV2") {

                const examen = await ExamenFamilleTowLevTow.findOne({ observateurId : observateurId });
                const commentaire = await Commentaire.deleteOne({ observateurId: observateurId, ref : ref });
                if(commentaire.deletedCount == 1) {
                    for(let i = 0; i < examen[refFix].length; i++) {
                        if(examen[refFix][i]["titre"] == titre) {
                            examen[refFix][i]["o"] = false;
                        }
                    }
                }
    
                await ExamenFamilleTowLevTow.updateOne({ observateurId: observateurId }, {
                    $set: {
                        a : examen.a,
                        b : examen.b,
                        c : examen.c,
                        d : examen.d,
                        e : examen.e,
                        f : examen.f,
                        g : examen.g,
                        h : examen.h,
                        i : examen.i,
                        j : examen.j,
                        k : examen.k,
                    }
                })
                .then(() => {
                    response.status(200).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            }

            if(observateur.typeAppareil[0] == "Famille 3 LEV3") {

                const examen = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });
                const commentaire = await Commentaire.deleteOne({ observateurId: observateurId, ref : ref });
                if(commentaire.deletedCount == 1) {
                    for(let i = 0; i < examen[refFix].length; i++) {
                        if(examen[refFix][i]["titre"] == titre) {
                            examen[refFix][i]["o"] = false;
                        }
                    }
                }
    
                await ExamenFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
                    $set: {
                        a : examen.a,
                        b : examen.b,
                        c : examen.c,
                        d : examen.d,
                        e : examen.e,
                        f : examen.f,
                        g : examen.g,
                        h : examen.h,
                        i : examen.i,
                        j : examen.j,
                        k : examen.k,
                    }
                })
                .then(() => {
                    response.status(200).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            }

            if(observateur.typeAppareil[0] == "Famille 4 LEV4") {

                const examen = await ExamenFamilleFourLevFour.findOne({ observateurId : observateurId });
                const commentaire = await Commentaire.deleteOne({ observateurId: observateurId, ref : ref });
                if(commentaire.deletedCount == 1) {
                    for(let i = 0; i < examen[refFix].length; i++) {
                        if(examen[refFix][i]["titre"] == titre) {
                            examen[refFix][i]["o"] = false;
                        }
                    }
                }
    
                await ExamenFamilleFourLevFour.updateOne({ observateurId: observateurId }, {
                    $set: {
                        a : examen.a,
                        b : examen.b,
                        c : examen.c,
                        d : examen.d,
                        e : examen.e,
                        f : examen.f,
                        g : examen.g,
                        h : examen.h,
                        i : examen.i,
                        j : examen.j,
                        k : examen.k,
                    }
                })
                .then(() => {
                    response.status(200).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            }

            if(observateur.typeAppareil[0] == "Famille 5 LEV5") {

                const examen = await ExamenFamilleFiveLevFive.findOne({ observateurId : observateurId });
                const commentaire = await Commentaire.deleteOne({ observateurId: observateurId, ref : ref });
                if(commentaire.deletedCount == 1) {
                    for(let i = 0; i < examen[refFix].length; i++) {
                        if(examen[refFix][i]["titre"] == titre) {
                            examen[refFix][i]["o"] = false;
                        }
                    }
                }
    
                await ExamenFamilleFiveLevFive.updateOne({ observateurId: observateurId }, {
                    $set: {
                        a : examen.a,
                        b : examen.b,
                        c : examen.c,
                        d : examen.d,
                        e : examen.e,
                        f : examen.f,
                        g : examen.g,
                        h : examen.h,
                        i : examen.i,
                        j : examen.j,
                        k : examen.k,
                    }
                })
                .then(() => {
                    response.status(200).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            }

        }



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}




export default { create , select, deleteOne, readCommentaires, deleteByRefAndObservateurId, supprimer, deleteByIndexAndRef }