import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (securityName === '1') { // clef du securityDefinition
        const token = 'token'; // Récupérer le token

        return new Promise((resolve, reject) => {
            if (!token) {
                return reject(new Error('No token provided'));
            }
            jwt.verify(
                token, JWT_SECRET!,
                function (err: any, decoded: any) {
                    if (err) {
                        return reject(err);
                    } else {
                        if (scopes !== undefined) {
                            // Custom verif
                        }
                        return resolve(decoded);
                    }
                }
            );
        });
    } else {
        return Promise.reject(new Error('Security definition not found'));
    }
}