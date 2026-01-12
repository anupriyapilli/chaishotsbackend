import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwt;
    constructor(jwt: JwtService);
    login(dto: {
        email: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
        };
        accessToken: string;
    }>;
}
