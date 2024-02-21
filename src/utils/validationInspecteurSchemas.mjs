export const validationInspecteurSchemas = {
    email : {
        isEmail : {
            errorMessage : "Please Insert Email"
        },
        notEmpty : {
            errorMessage : "email cannot be empty"
        },
        isString : {
            errorMessage : "name must be a string"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "name cannot be empty"
        }
    }
}