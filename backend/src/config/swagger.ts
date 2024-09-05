import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';


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

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
