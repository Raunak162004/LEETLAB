import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// routes
import authRoutes from "./routes/auth.routes.js"

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 