"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management System API',
            version: '1.0.0',
            description: 'API documentation for the Task Management System',
        },
        servers: [
            {
                // url: 'https://task-management-system-qrgm.onrender.com', // Replace with your server URL
                url: 'http://localhost:5000', // Replace with your server URL
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
