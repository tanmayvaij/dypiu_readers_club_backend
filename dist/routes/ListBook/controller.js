"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleListBook = void 0;
const schema_1 = require("./schema");
const handleListBook = async (req, res) => {
    const book = await schema_1.ListedBookSchema.create({
        bookname: req.body.bookname,
        desc: req.body.desc,
        price: req.body.price,
        image_url: process.env.HOST_STATIC_PATH + req.file?.filename
    });
    res.status(200).json({ book });
};
exports.handleListBook = handleListBook;
