export const validationInterventionSchemas = {

    date : {

        isDate : {
            errorMessage : "Vous devez saisir Date valide"
        },

        notEmpty : {
            errorMessage : "La Date ne peut pas être vide"
        }
    },

    numeroAffaire : {

        isString : {
            errorMessage : "Vous devez saisir Numero Affaire valide"
        },

        notEmpty : {
            errorMessage : "Numero Affaire ne peut pas être vide"
        }
    },

    site : {

        isNumber : {
            errorMessage : "Vous devez saisir Site valide"
        },

        notEmpty : {
            errorMessage : "Site ne peut pas être vide"
        }
    },

    etablissement : {

        isString : {
            errorMessage : "Vous devez saisir Établissement valide"
        },

        notEmpty : {
            errorMessage : "Établissement ne peut pas être vide"
        }
    },
    
    repere : {

        isString : {
            errorMessage : "Vous devez saisir Repère valide"
        },

        notEmpty : {
            errorMessage : "Repère ne peut pas être vide"
        }
    },

    adresse : {

        isString : {
            errorMessage : "Vous devez saisir Adresse valide"
        },

        notEmpty : {
            errorMessage : "Adresse ne peut pas être vide"
        }
    },

    codePostal : {

        isString : {
            errorMessage : "Vous devez saisir Code Postal valide"
        },

        notEmpty : {
            errorMessage : "Code Postal ne peut pas être vide"
        }
    },

    ville : {

        isString : {
            errorMessage : "Vous devez saisir Ville valide"
        },

        notEmpty : {
            errorMessage : "Ville Postal ne peut pas être vide"
        }
    },

    pays : {

        isString : {
            errorMessage : "Vous devez saisir Pays valide"
        },

        notEmpty : {
            errorMessage : "Pays Postal ne peut pas être vide"
        }
    },

    metier : {

        isString : {
            errorMessage : "Vous devez saisir Métier valide"
        },

        notEmpty : {
            errorMessage : "Métier Postal ne peut pas être vide"
        }
    }

}
