import mongoose from 'mongoose';

const DB_PASSWORD_PROD = "11mHzRheusJ2YzqS"
const DB_USER_PROD = "gthconsultservice"

var urlConnecteDev = `mongodb+srv://${DB_USER_PROD}:${DB_PASSWORD_PROD}@cluster0.gtvlx.mongodb.net/?retryWrites=true&w=majority`;
// console.log(urlConnecteDev)
mongoose.createConnection(urlConnecteDev,
  {
    dbName : "test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// export default mongoose;

module.exports = mongoose;