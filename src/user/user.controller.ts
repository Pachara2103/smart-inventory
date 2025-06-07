import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {
    constructor(private readonly userServise: UserService){}
    @Post('register')
    create(@Body() registerDto:RegisterDto){
        return  this.userServise.createUser(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
    const finduser = this.userServise.findByEmail(req.user.email);
    return finduser;
    }
}


