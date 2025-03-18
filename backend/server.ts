import express from 'express';
import { router } from './src/index';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});