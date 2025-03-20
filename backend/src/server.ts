import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import { connectDB } from './config/db.js';
import { router as authRouter } from './routes/authRoutes.js';	
import { router as noteRouter } from './routes/noteRoutes.js';

// Configuración de variables de entorno
dotenv.config();

// Instancias de express
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200/', // Solo permite solicitudes desde este origen
  credentials: true, // Permite enviar cookies u otros encabezados sensibles
};

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions))

// Rutas
app.use('/api', authRouter);
app.use('/api', noteRouter);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});

