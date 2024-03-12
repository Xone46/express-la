import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { users } from "../models/users.mjs"

const create = (request, response) => {


    try {

        const result = validationResult(request);
        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }
        const data = matchedData(request);
        const userId = parseInt(users.length + 1);
        users.push({
            id: userId,
            name: String(data.name),
            age: parseInt(data.age)
        });

        response.status(200).json(users);

    } catch (error) {
        console.log(`Eroor : ${error}`)
    }

}

const read = (request, response) => {
    // 2 - send with client browser for verfied ok (check in browser )
    if(request.signedCookies.name && request.signedCookies.name == "xone46") {
        response.status(200).send(users);
    } else {
        return response.status(403).json({ msg : "You need the correcte cookie"});
    }
}

const select = (request, response) => {

    try {
        const userId = parseInt(request.params.id);

        if (isNaN(userId)) {
            return response.status(400).send({ msg: "Bad Request ID is Invalid" })
        }

        const findUser = users.find((user) => user.id === userId)

        if (!findUser) {
            return response.status(404).send({ msg: "Not found" })
        }

        response.status(200).send(findUser);

    } catch (error) {
        console.log('Error: ', error)
    }
}

const deleteOne = (request, response) => {

    try {

        const userId = parseInt(request.params.id);

        if (isNaN(userId)) {
            return response.status(400).json({ msg: "Bad Request, ID is Invalid" });
        }

        const result = users.splice(userId, 1);

        if (result.length == 0) response.status(404).json({ msg: "Not found" })
        else return response.status(200).json({ msg: "User deleted" });

    } catch (error) {
        console.log('Error: ', error)
    }
}

const update = (request, response) => {
    try {

        const { body, params: { id } } = request;
        const userId = parseInt(id);

        if (isNaN(userId)) return response.json({ msg: "Bad Request" }).status(400);
        const findUserIndex = users.findIndex((user) => user.id === userId)
        if (findUserIndex === -1) return response.status(404).send({ msg: "Not found" })

        users[findUserIndex] = { id: userId, ...body };

        return response.status(200).json(users[findUserIndex]);


    } catch (error) {
        console.log(`Error : ${error}`)
    }
}


const updateName = (request, response) => {
    try {

        const { body: { name, findUserIndex } } = request;
        users[findUserIndex] = { ...users[findUserIndex], name: name };
        return response.status(200).json(users[findUserIndex]);

    } catch (error) {
        console.log(`Error : ${error}`)
    }
}


export default { read, create, select, deleteOne, update, updateName }

