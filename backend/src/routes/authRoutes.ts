import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { AuthService } from "../services/authService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/protected", authMiddleware, authController.protectedData.bind(authController));
router.post("/logout", authController.logout.bind(authController));
export { router };
