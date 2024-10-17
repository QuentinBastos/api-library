import {User} from "../models/user.model"; // Modèle Sequelize
import jwt from "jsonwebtoken"; // Pour générer le JWT
import {Buffer} from "buffer"; // Pour décoder Base64
import {notFound} from "../error/NotFoundError";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthenticationService {
    public async authenticate(
        username: string,
        password: string
    ): Promise<string> {
        // Recherche l'utilisateur dans la base de données
        const user = await User.findOne({where: {username}});

        if (!user) {
            throw notFound("User");
        }

        // Décoder le mot de passe stocké en base de données
        const decodedPassword = Buffer.from(user.password, "base64").toString(
            "utf-8"
        );

        // Vérifie si le mot de passe est correct
        if (password === decodedPassword) {
            return this.generateJwt(user.username);
        } else {
            let error = new Error("Wrong password");
            (error as any).status = 403;
            throw error;
        }
    }

    private generateJwt(username: string): string {
        let permissions: any = {};

        if (username === 'admin') {
            permissions = {
                author: ['read', 'create', 'update', 'delete'],
                book: ['read', 'create', 'update', 'delete'],
                bookCollection: ['read', 'create', 'update', 'delete'],
            };
        } else if (username === 'gerant') {
            permissions = {
                author: ['read', 'create', 'update'],
                book: ['read', 'create', 'update'],
                bookCollection: ['read', 'create', 'update', 'delete'],
            };
        } else if (username === 'user') {
            permissions = {
                author: ['read'],
                book: ['read', 'create'],
                bookCollection: ['read'],
            };
        }

        const payload = {
            username: username,
            scopes: permissions,
        };
        console.log(permissions)
        return jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
    }

}

export const authService = new AuthenticationService();