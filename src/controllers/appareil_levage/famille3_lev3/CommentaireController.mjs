
import { CommentaireFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/commentaire.mjs";
import { ExamenFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/examen.mjs";


const create = async (request, response) => {

    try {

        const { observateurId, ref, number, titre, modelSelected } = request.body;

        const exist = await CommentaireFamilleTreeLevTree.findOne({ observateurId : observateurId, ref : ref, number : number, titre : titre });
        if(exist) {
            await CommentaireFamilleTreeLevTree.updateOne({observateurId : observateurId }, { $set : { ref : ref, number : number, titre : titre, modelSelected :modelSelected }})
            .then(() => {
                response.status(201).json({ msg: "Modifié avec succès" })
            })
            .catch((error) => {
                response.status(400).json(error);
            });

        } else {
            await CommentaireFamilleTreeLevTree({ observateurId, ref, number, titre, modelSelected })
            .save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
                console.log(error)
            });
        }



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const select = async (request, response) => {

    try {

        const { observateurId, ref, number, titre } = request.body;

        const commentaire = await CommentaireFamilleTreeLevTree.findOne({ observateurId : observateurId, ref : ref, number : number, titre : titre });
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
        const commentaire = await CommentaireFamilleTreeLevTree.deleteOne({ _id : commentaireId });
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
        const commentaire = await CommentaireFamilleTreeLevTree.find({ observateurId : observateurId });
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
        const commentaire = await CommentaireFamilleTreeLevTree.deleteOne({ ref : ref, observateurId : observateurId });
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
            ref,
            observateurId,
            name
        } = request.body;

        const refFix = String(ref).toLowerCase();



        const commentaire = await CommentaireFamilleTreeLevTree.findOne({ observateurId : observateurId, ref : ref });
        for(let i = 0; i < commentaire.modelSelected.length; i++) {
            if(commentaire.modelSelected[i].name == name) {
                commentaire.modelSelected.splice(i, 1);
            }
        } 

        if(commentaire.modelSelected.length > 0) {
            await CommentaireFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
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

        if(commentaire.modelSelected.length == 0) {
            const examen = await ExamenFamilleTreeLevTree.findOne({ observateurId : observateurId });
            const commentaire = await CommentaireFamilleTreeLevTree.deleteOne({ observateurId: observateurId, ref : ref });
            if(commentaire) {
                for(let i = 0; i < examen[refFix].length; i++) {
                    if(examen[refFix][i]["titre"] == name) {
                        examen[refFix][i]["o"] = false;
                    }
                }
            }

            await ExamenFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
                $set: {
                    a : examen["a"],
                    b : examen["b"],
                    c : examen["c"],
                    d : examen["d"],
                    e : examen["e"],
                    f : examen["f"],
                    g : examen["g"],
                    h : examen["h"],
                    i : examen["i"],
                    j : examen["j"],
                    k : examen["k"]
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



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select, deleteOne, readCommentaires, deleteByRefAndObservateurId, supprimer }