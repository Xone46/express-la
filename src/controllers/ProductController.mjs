import { products } from "../models/products.mjs"

const read = (request, response) => {

    try {

        const { query : { name } } = request; 

        // if(request.cookies.name && request.cookies.name === name ) {
        //     response.status(200).json(products);
        // } else {
        //     response.status(403).json({ msg : "Sorry , You need the correct  cookie" });
        // }

        if(request.signedCookies.name && request.signedCookies.name === name ) {
            response.status(200).json(products);
        } else {
            response.status(403).json({ msg : "Sorry , You need the correct  cookie" });
        }

    } catch(error) {
        response.status(400).json(error);
    }

    // console.log(request.headers.cookie)
    // console.log(request.cookies)

    // console.log(request.headers.cookie)
}

export default { read }