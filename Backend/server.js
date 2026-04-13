const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const defaultCorsOrigins = [
    "https://www.gatewaysoftwaresolutions.com",
    "https://gatewaysoftwaresolutions.com",
    "https://gateway-backend-wiup.onrender.com",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
];
const configuredCorsOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);
const allowedCorsOrigins = [...new Set([...defaultCorsOrigins, ...configuredCorsOrigins])];
const corsOptions = {
    origin(origin, callback) {
        if (!origin || origin === "null" || allowedCorsOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, '../Front end')));

const fallbackAssetDirs = [
    path.join(__dirname, "../Front end/Updated Images"),
    path.join(__dirname, "../Front end/assets/images/team-members"),
    path.join(__dirname, "../Front end/assets/images"),
    path.join(__dirname, "../Front end/assets"),
];
const fallbackAssetIndex = new Map();

function normalizeAssetKey(fileName) {
    return path
        .basename(fileName, path.extname(fileName))
        .replace(/^\d+-/, "")
        .replace(/[^a-z0-9]+/gi, " ")
        .trim()
        .toLowerCase();
}

function indexFallbackAssets(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const entryPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            indexFallbackAssets(entryPath);
            continue;
        }

        if (entry.isFile()) {
            const key = normalizeAssetKey(entry.name);
            if (key && !fallbackAssetIndex.has(key)) {
                fallbackAssetIndex.set(key, entryPath);
            }
        }
    }
}

fallbackAssetDirs.forEach(indexFallbackAssets);

app.get("/uploads/:folder/:fileName", (req, res, next) => {
    const key = normalizeAssetKey(decodeURIComponent(req.params.fileName));
    const fallbackFile = fallbackAssetIndex.get(key);

    if (!fallbackFile) {
        return next();
    }

    return res.sendFile(fallbackFile);
});

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://gatewaysoftware_db_user:Gatewaysoftware%40321@gatewaysoftwaresolution.6ojni4y.mongodb.net/?appName=gatewaysoftwaresolution";

const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(async () => {
        console.log(`MongoDB Connected: ${mongoURI}`);

        const adminExists = await Admin.findOne({ email: "admin@gateway.com" });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await Admin.create({ email: "admin@gateway.com", password: hashedPassword });
            console.log("Default admin created: admin@gateway.com / admin123");
        }
    })
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/college", require("./routes/collegeRoutes"));
app.use("/api/project", require("./routes/projectsRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));
app.use("/api/careerApply", require("./routes/careerApplyRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/project-enquiry", require("./routes/projectEnquiryRoutes"));
app.use("/api/start-project", require("./routes/startProjectRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/internEnquiry", require("./routes/internEnquiryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
