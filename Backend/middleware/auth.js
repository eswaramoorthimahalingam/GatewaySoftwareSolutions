const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/appConfig");

module.exports = function(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], jwtSecret);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
