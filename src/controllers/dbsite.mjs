// import mongoose from "mongoose";

// const DB_NAME_ATLAS = process.env.DB_NAME_ATLAS
// const DB_PASSWORD_ATLAS = process.env.DB_PASSWORD_ATLAS

// const urlConnecteDev = `mongodb+srv://gthconsultservice:${DB_PASSWORD_ATLAS}@cluster0.gtvlx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.connect(urlConnecteDev, {
//     dbName: DB_NAME_ATLAS,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('mongodb connected');
//     })
//     .catch(err => console.log(err.message))

// mongoose.set('strictQuery', false);

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to DB');
// })
// mongoose.connection.on('error', (err) => {
//     console.log(err.message);
// })
// mongoose.connection.on('disconnected', () => {
//     console.log('Moongose connecton is disconnected');
// })


// // export default  // ✅

// export default {
//     con : mongoose
// } 

