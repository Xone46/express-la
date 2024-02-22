export const validationInspecteurSchemas = {
    email : {
        isEmail : {
            errorMessage : "Veuillez insérer un E-mail"
        },
        notEmpty : {
            errorMessage : "L'E-mail ne peut pas être vide"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "Mot de passe ne peut pas être vide"
        }
    }
}