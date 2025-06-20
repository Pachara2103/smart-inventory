import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async validateUser(email: string, googleId: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(googleId, user.googleId))) {
            const result = user.toObject();
            console.log(result);
            return {
                meg: 'login successfully',
                email: result.email,
                UserId: result._id,
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async googleLogin(req): Promise<any> { //คืนค่า accessToken
        if (!req.user) {
            throw new Error('Google login failed: No user information received.');
        }

        const { email, name, picture, googleId } = req.user;
        let user = await this.userModel.findOne({ email });

        if (!user) {
            user = new this.userModel({
                email,
                name,
                picture,
                googleId,
            });
            await user.save();
        }

        const payload = { email: user.email };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

