const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "smTM");
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = { authenticateToken };
