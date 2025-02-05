import mongoose from 'mongoose';

  // for prod "service.supports"
  const uri = process.env.MONGO_URI;
  
  // Connexion à la base de données
  const connectToDB = async () => {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connecté avec Mongoose à la base de données "test"!');
    } catch (error) {
      console.error('Erreur de connexion MongoDB avec Mongoose:', error);
    }
  };
  
  // Exporter la fonction de connexion
  export default connectToDB;
  