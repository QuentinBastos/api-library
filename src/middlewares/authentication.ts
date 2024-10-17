import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (securityName === 'jwt') {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return Promise.reject(new Error('No authorization header provided'));
        }

        const token = authHeader.split(' ')[1];

        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET!, (err: any, decoded: any) => {
                if (err) {
                    return reject(err);
                } else {
                    if (scopes) {
                        // Custom verification logic for scopes
                    }
                    return resolve(decoded);
                }
            });
        });
    } else {
        return Promise.reject(new Error('Security definition not found'));
    }
}