import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  image: String
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'portfolio-api' }));
app.get('/api/projects', async (_req, res) => {
  try { res.json(await Project.find().sort({ createdAt: -1 })); }
  catch { res.status(500).json({ message: 'Failed to load projects' }); }
});
app.post('/api/projects', async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

const port = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(port, () => console.log(`API running on ${port}`));
  }).catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
} else {
  app.listen(port, () => console.log(`API running on ${port} (MongoDB not configured)`));
}
