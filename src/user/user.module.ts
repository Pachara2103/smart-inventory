import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Module({
  imports:[
    MongooseModule.forFeature([{
     name: User.name, 
     schema: UserSchema
  }])
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
  exports:[UserService]
})
export class UserModule {}
