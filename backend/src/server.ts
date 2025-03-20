import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import { router } from './routes/authRoutes.js';	
import cookieParser from 'cookie-parser';

// Agrega esto después de app.use(express.json())



const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use('/api', router);
