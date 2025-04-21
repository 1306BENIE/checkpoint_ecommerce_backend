import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100), // € → cents
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Erreur Stripe :", err);
    res.status(500).json({ error: "Quelque chose s’est mal passé." });
  }
});

export default router;
