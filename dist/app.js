"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const db_1 = require("./db/db");
// Initialized environment variables
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = (process.env.PORT || 5000);
// Express configurations
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// Importing routers from ./routes
const ListBook_1 = __importDefault(require("./routes/ListBook"));
const Auth_1 = __importDefault(require("./routes/Auth"));
// Using routers
app.use("/api/book", ListBook_1.default);
app.use("/api/auth", Auth_1.default);
// Starting the server
const start = async () => {
    try {
        // Connecting to database
        (0, db_1.connectDB)();
        app.listen(PORT, () => {
            console.log("Server started succesfully at 5000");
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
