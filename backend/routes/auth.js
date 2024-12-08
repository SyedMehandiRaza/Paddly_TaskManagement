// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];




//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }


//     // Verify the token
//     // const decoded = jwt.verify(token, smTM, (err, user) => {
//     //   if (err) {
//     //     return res.status(403).json({ message: "Token is not valid" });
//     //   }
//     // });
//     // req.user = user;
//     try {
//       const decoded = jwt.verify(token, "smTM");
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(403).json({ message: "Token is not valid" });
//     }
    
    
//     next(); 
// };

// module.exports = {authenticateToken};








const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token and attach the decoded payload to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "smTM");
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = { authenticateToken };
