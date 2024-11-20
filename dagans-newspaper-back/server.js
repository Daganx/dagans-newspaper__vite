require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Initialisation de l'application Express
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const articleRoutes = require("./routes/articleRoutes");

// Associer les routes avec des préfixes distincts
app.use("/api/auth", authRoutes); // Routes pour l'authentification
app.use("/api/auth", adminRoutes); // Routes pour l'administration
app.use("/api/articles", articleRoutes); // Routes pour les articles

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
