const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extraction du token du header

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
      console.log("Decoded token:", decoded); // Affiche le contenu du token pour déboguer
      req.user = decoded.user; // Ajout de l'utilisateur décodé à la requête
      next(); // Poursuite de la requête
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
