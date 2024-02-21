import { users } from "../../models/users.mjs"

export const resolveIndexByUserId = (request, response, next) => {
    const { params: { id } } = request;
    const userId = parseInt(id);

    if (isNaN(userId)) return response.json({ msg: "Bad Request" }).status(400);
    const findUserIndex = users.findIndex((user) => user.id === userId)
    if (findUserIndex === -1) return response.status(404).send({ msg: "Not found" });
    // new value name findUserIndex
    request.findUserIndex = findUserIndex;
    next();
}