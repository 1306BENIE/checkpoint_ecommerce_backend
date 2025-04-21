import express from "express";
import productData from "../data/products.js"; // Importer les données de produits

const router = express.Router();

// Lire tous les produits
// GET /api/products
router.get("/", async (req, res) => {
  try {
    res.status(200).json(productData);
    return;
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// Lire un produit
// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await productData.find((p) => p.id === req.params.id);
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
