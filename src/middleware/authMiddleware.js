const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // Get token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");

    // Attach user information to the request
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
