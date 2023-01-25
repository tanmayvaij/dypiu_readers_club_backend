"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
// Storage settings
const storage = multer_1.default.diskStorage({
    destination: "./src/uploads",
    filename: (_, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
exports.uploadImage = (0, multer_1.default)({ storage }).single("imageFile");
