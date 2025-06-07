import { Injectable } from '@nestjs/common';
import {User, UserDocument} from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {RegisterDto} from './dto/register.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    async createUser(registerDto : RegisterDto): Promise<User>{
        console.log('registerDto======', registerDto); 
        const newUser = new this.userModel(registerDto);
        return newUser.save();
    }

    async findByEmail(email: string) : Promise<UserDocument | null>{
        console.log('find by email called');
        return this.userModel.findOne({email}).exec();
    }
}
