import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { name, lastname, email, password } = req.body;
      const user = await this.authService.register(
        name,
        lastname,
        email,
        password
      );
      res.status(201).json(user);
    } catch (error) {
      res
        .status(400)
        .json({
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password, res);
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res
        .status(400)
        .json({
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
  }

  async protectedData(req: Request, res: Response) {
    try {
        // req.user contiene los datos del usuario autenticado (gracias al middleware)
        const user = req.user as { userId: string; name: string };

        // Devuelve información protegida
        res.status(200).json({
            message: 'This is protected data',
            user: {
                id: user.userId, // El ID del usuario decodificado del token
                name: user.name, // El nombre del usuario decodificado del token
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

  async logout(req: Request, res: Response) {
    try {
      const result = await this.authService.logout(res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
