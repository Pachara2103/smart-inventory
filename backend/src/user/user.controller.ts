import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userServise: UserService,
    ) { }
    @Post('signup')
    create(@Body() signupDto: SignUpDto) {
        return this.userServise.createUser(signupDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const finduser = this.userServise.findByEmail(req.user.email);
        return finduser;
    }

}


