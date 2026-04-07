const path = require("path");

const backendDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(backendDir, "..");

module.exports = {
    backendDir,
    rootDir,
    frontendDir: path.join(rootDir, "Front end"),
    uploadsDir: path.join(backendDir, "uploads"),
    mongoURI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gatewaysoftware",
    port: Number(process.env.PORT) || 5000,
    jwtSecret:
        process.env.JWT_SECRET ||
        "GATEWAY_ADMIN_SECRET_2026_CHANGE_ME"
};
