require("dotenv").config();
const mongoose = require("mongoose");

// connexion à la base de données

const mongoDBConnexion = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie!");
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB :", error.message);
    process.exit(1);
  }
};

module.exports = mongoDBConnexion;
