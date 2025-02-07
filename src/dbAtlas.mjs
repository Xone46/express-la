import mongoose from 'mongoose';

const DB_PASSWORD_PROD = "11mHzRheusJ2YzqS"
const DB_USER_PROD = "gthconsultservice"

var urlConnecteDev = `mongodb+srv://${DB_USER_PROD}:${DB_PASSWORD_PROD}@cluster0.gtvlx.mongodb.net/?retryWrites=true&w=majority`;

export const connectAtlasDB = async () => {
    try {
        // Use createConnection instead of connect for multiple connections
        const atlasConnection = mongoose.createConnection(urlConnecteDev, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        atlasConnection.on('connected', () => {
            console.log('Connected to MongoDB Atlas...');
        });

        atlasConnection.on('error', (err) => {
            console.error('MongoDB Atlas connection error:', err);
        });

        return atlasConnection; // Return the connection for use in your models
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1); // Exit the process if connection fails
    }
};

