import { Controller, Get, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-suth.guard";
import { GoogleAuthGuard } from './google-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res) {
        const access_token = await this.authService.login(req.user);

        res.cookie('access_token', access_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,

        }); //ทำให้javascrip pull cookies ตรงๆไม่ได้
        return 'Login Successful';
    }


    @Get('google/signin')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Res() res) {
        // console.log('req = ', req.user)
        const { accessToken } = await this.authService.googleLogin(req);
        res.cookie('access_token', accessToken, {
            httpOnly: true, //httpOnly cookie ถูกป้องกันไม่ให้ JavaScript หรือ DevTools อ่านหรือแก้ไขโดยตรง (เพื่อความปลอดภัย
            sameSite: 'lax',
            secure: false,
            path: '/',
        });

        res.redirect('http://localhost:5173/Dashboard');

    }




}