import { AuthService } from './auth.service';
import { LoginDto } from '../programs/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    test(): {
        message: string;
    };
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
        };
        accessToken: string;
    }>;
}
