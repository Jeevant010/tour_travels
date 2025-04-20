const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Use environment variable for the secret

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        console.log("Extracted token:", token); // Debugging token extraction
        
        if (!token) {
            console.error("No token provided in Authorization header");
            return res.status(401).json({ error: "Authentication required" });
        }

        const secret = JWT_SECRET || "supposetobe"; // Ensure fallback is consistent
        if (!JWT_SECRET) {
            console.warn("JWT_SECRET is not set in the environment variables. Using fallback secret.");
        }

        const decoded = jwt.verify(token, secret); // Verify token with secret
        req.user = decoded;

        console.log("Token verified successfully:", decoded); // Log decoded token for debugging
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};