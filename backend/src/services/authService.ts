import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../repositories/userRepository.js";

export class AuthService {
    async register(name: string, lastname: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, lastname, email, password: hashedPassword });
        return user;
    }

    async login(email: string, password: string, res: any) {
        const user = await UserModel.findOne({ email });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid email or password");
        }
    
        // Generar el token JWT
        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
        // Configurar la cookie con el token
        res.cookie('token', token, {
            httpOnly: true, // Previene que el cliente acceda al token desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo envía la cookie por HTTPS en producción
            sameSite: 'strict', // Previene ataques CSRF
            maxAge: 3600000, // Tiempo de expiración en milisegundos (1 hora)
        });
    
        return user;
    }

    async logout(res: any) {
        // Eliminar la cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    
        return { message: 'Logout successful' };
    }
}
