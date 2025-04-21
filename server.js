import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectToDatabase from "./db-Connection/mongoDBConnection.js";

// Routes
import productRoutes from "./routes/products.js";
import checkoutRoutes from "./routes/checkout.js"; // 👈 Import de la route Stripe

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ces lignes permettent de récupérer le __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir les fichiers statiques du dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Connexion à la base de données
connectToDatabase();

// Routes
app.use("/products", productRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
