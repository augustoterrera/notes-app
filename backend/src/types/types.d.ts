import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload;
    }
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload & { userId: string; name: string };
    }
}