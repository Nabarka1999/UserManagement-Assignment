import express from 'express';
import connectDB from './config/config.js';
import router from './routes/routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api", router)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
