import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';
import { setupSwagger } from './config/swagger'; // Adjust the path as neede

dotenv.config();

const app = express();

setupSwagger(app);
app.use(express.json());

// CORS configuration: Allow all origins
app.use(cors());

app.use('/', userRoutes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

export default app;
