"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListedBookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ListedBookSchema = (0, mongoose_1.model)('listedBook', new mongoose_1.Schema({
    bookname: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
}));
