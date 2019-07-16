import { Controller, UseGuards, Post, Request, Get, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('authorize')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @Post('register')
    async register(
        @Response() res: any
    ) {
        res.redirect(307, '/api/users')
    }
}