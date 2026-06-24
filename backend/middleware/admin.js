const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    console.log("AUTH HEADER:", header);

    if (!header) return res.status(401).json("No token");

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    if (!decoded.isAdmin) {
      return res.status(403).json("Admin only");
    }

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json("Invalid token");
  }
};