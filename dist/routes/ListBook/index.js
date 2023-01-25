"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
router.route('/listbook').post(middleware_1.uploadImage, controller_1.handleListBook);
exports.default = router;
