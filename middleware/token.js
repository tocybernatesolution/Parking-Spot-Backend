import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, username: user.username,role:user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // e.g., 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // e.g., 7 days
  );

  return { accessToken, refreshToken };
};
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Access token missing. Unauthorized access.",
      });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          message: "Invalid or expired access token. Forbidden access.",
        });
      }
        if (user.role !== "admin") {
        return res.status(403).json({
          status: false,
          message: "Access denied. Admins only.",
        });
      }
      req.user = user;
      next();
    });
};
export { generateTokens,authenticateToken };
