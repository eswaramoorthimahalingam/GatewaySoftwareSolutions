const express = require("express");
const cors = require("cors");
const path = require("path");
const { frontendDir, uploadsDir } = require("./config/appConfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));
app.use(express.static(frontendDir));

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api", require("./routes"));

app.get("/admin", (req, res) => {
    res.sendFile(path.join(frontendDir, "admin", "index.html"));
});

app.get("/admin/login", (req, res) => {
    res.sendFile(path.join(frontendDir, "admin", "login.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});

module.exports = app;
