// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith("Bearer")) {
//     try {
//       token = token.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized" });
//     }
//   } else {
//     res.status(401).json({ message: "No token" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    req.user = user; // attach user to request
    next(); // allow admin to proceed
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyAdmin };