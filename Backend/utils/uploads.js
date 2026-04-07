const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { uploadsDir } = require("../config/appConfig");

function ensureDir(targetDir) {
    fs.mkdirSync(targetDir, { recursive: true });
    return targetDir;
}

function sanitizeFileName(originalName) {
    const extension = path.extname(originalName).toLowerCase();
    const baseName = path
        .basename(originalName, extension)
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "file";

    return `${Date.now()}-${baseName}${extension}`;
}

function createUploadMiddleware(folderName) {
    const destinationDir = ensureDir(path.join(uploadsDir, folderName));

    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, destinationDir),
            filename: (req, file, cb) => cb(null, sanitizeFileName(file.originalname))
        })
    });
}

function buildUploadPath(folderName, fileName) {
    return `/uploads/${folderName}/${fileName}`;
}

module.exports = {
    buildUploadPath,
    createUploadMiddleware,
    ensureDir
};
