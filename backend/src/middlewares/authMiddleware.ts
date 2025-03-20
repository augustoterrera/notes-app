import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        // Verificar que el token decodificado es un objeto y no un string
        if (typeof decoded === "string") {
            res.status(403).json({ error: "Invalid token format." });
            return;
        }

        // Asignar el usuario al request con la estructura correcta
        req.user = decoded as JwtPayload & { userId: string; name: string };
        
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};
