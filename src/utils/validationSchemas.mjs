export const validationUserSchema = {
    name : {
        isLength : {
            options : {
                min : 5,
                max : 15
            },
            errorMessage : "name must be least 5 chracters with a max of 15 chracters"
        },
        notEmpty : {
            errorMessage : "name cannot be empty"
        },
        isString : {
            errorMessage : "name must be a string"
        }
    },
    age : {
        isLength : {
            options : {
                min: 1,
                max: 3
            },
            errorMessage : "must be age between 1 to 399"
        },
        notEmpty : {
            errorMessage : "name cannot be empty"
        },
        isInt : {
            errorMessage : "name must be a number"
        }
    }
}