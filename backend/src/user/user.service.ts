import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {SignUpDto} from './dto/signup.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    async createUser(signuoDto : SignUpDto): Promise<User>{
        console.log('sign up user === ', signuoDto); 
        const newUser = new this.userModel(signuoDto);
        console.log('Saved userrrrrrrrrrrrrrrrrrrrrrrrrr');
        return newUser.save(); //เข้า mongo
    }

    async findByEmail(email: string) : Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }

}
