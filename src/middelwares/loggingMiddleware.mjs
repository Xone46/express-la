export const loggingMiddleware = (request, response, next) => {
    console.log(`Method : ${request.method} | Url : ${request.url}`);
    next();
}