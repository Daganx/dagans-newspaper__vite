const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const protect = require("../middleware/authMiddleware");

// Créer un article
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newArticle = await Article.create({ title, content });
    res.status(201).json(newArticle);
  } catch (err) {
    console.error(err); // Log de l'erreur pour le débogage
    res.status(500).json({ message: "Server error" });
  }
});
// Lire tous les articles (protégé)
router.get("/", protect, async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err); // Log de l'erreur pour le débogage
    res.status(500).json({ message: "Server error" });
  }
});

// Mettre à jour un article
router.put("/:id", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.title = title;
    article.content = content;
    const updatedArticle = await article.save();

    res.status(200).json(updatedArticle);
  } catch (err) {
    console.error(err); // Log de l'erreur pour le débogage
    res.status(500).json({ message: "Server error" });
  }
});

// Supprimer un article
router.delete("/:id", protect, async (req, res) => {
  try {
    // Vérification de l'existence de l'article
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Suppression de l'article
    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Article deleted" });
  } catch (err) {
    console.error(err); // Log de l'erreur pour le débogage
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
