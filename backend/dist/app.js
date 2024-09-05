"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./config/swagger"); // Adjust the path as neede
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, swagger_1.setupSwagger)(app);
app.use(express_1.default.json());
// CORS configuration: Allow all origins
app.use((0, cors_1.default)());
app.use('/', userRoutes_1.default);
app.use(errorHandler_1.default);
database_1.default.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});
exports.default = app;
