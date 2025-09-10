import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// routes
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from './routes/problem.routes.js';
import executionRoutes from './routes/executeCode.route.js';
import healthcheckRoutes from './routes/healthcheck.route.js';
import playlistRoutes from './routes/playlist.routes.js';
import submissionRoutes from './routes/submission.routes.js';

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute', executionRoutes);
app.use('/api/v1/healthcheck', healthcheckRoutes);
app.use('/api/v1/playlists', playlistRoutes);
app.use('/api/v1/submissions', submissionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 