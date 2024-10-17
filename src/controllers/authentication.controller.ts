import {Controller, Post, Body, Route, Tags} from "tsoa";
import * as jwt from "jsonwebtoken";
import {AuthenticationInputDTO, AuthenticationOutputDTO} from "../dto/authentication.dto";
import {userService} from "../services/user.service";
import {rolesPermissions, Role} from "../config/role";

@Route("auth")
@Tags("Authentication")
export class AuthenticationController extends Controller {
    @Post("/")
    public async authenticate(
        @Body() requestBody: AuthenticationInputDTO
    ): Promise<AuthenticationOutputDTO> {
        const {username, password} = requestBody;
        const user = await userService.validateUser(username, password);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
        const role = user.username as Role;
        const permissions = rolesPermissions[role];
        const token = jwt.sign({id: user.id, username: user.username, role, permissions}, JWT_SECRET, {
            expiresIn: "1h",
        });

        return {message: "Authentication successful", token};
    }
}