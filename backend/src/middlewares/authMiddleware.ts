import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }

    try {
        //Verificar el token
        const decoded = jwt.verify(token, config.jwtSecret); // Verificar el token
        req.user = decoded; // Agregar usuario al objeto req
        next(); // Pasar al siguiente middleware
    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};