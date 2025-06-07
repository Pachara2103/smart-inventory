import { Controller, Get, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-suth.guard";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res) {
        const access_token = await this.authService.login(req.user);
        // return access_token;

        //save to cookies
        res.cookie('test', access_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,

        }); //ทำให้javascrip pull cookies ตรงๆไม่ได้
        return 'Login Successful';
    }


}