import { users } from "../models/users.mjs"

const login = (request, response) => {

    try {

        const { body : { username , password } } = request; 

        const findUser = users.find((user) => user.username === username);
        if(!findUser) return response.status(401).json({ msg : "BAD CRADENTIALS"});
        if(findUser.password != password ) return  response.status(401).json({ msg : "PASSWORD NOT CORRECT"});
        else request.session.user = findUser;
        return response.status(200).json(findUser);

    } catch(error) {
        response.status(400).json(error);
    }

    // console.log(request.headers.cookie)
    // console.log(request.cookies)

    // console.log(request.headers.cookie)
}


const status = (request, response) => {

    try {
        
        request.sessionStore.get(request.session.id, (err, sessionData) => {
            if(err) console.log(err)
            console.log(sessionData)
        });

        if(request.session.user) {
            response.status(200).json(request.session.user);
        } else {
            response.status(401).json({ msg : "BAD AUTH" });
        }

    } catch(error) {
        response.status(400).json(error);
    }

}
export default { login, status }