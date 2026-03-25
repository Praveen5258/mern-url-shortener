import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import urlroutes from './routes/url.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/', urlroutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
