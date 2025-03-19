import express from 'express';
import { connectDB } from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
})