import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { LocalAuthGuard } from "./local-suth.guard";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleAuthGuard } from "./google-auth.guard";
import { GoogleStrategy } from "./strategy/google.strategy";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';



@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
        }),
        // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    ],
    controllers: [AuthController],
    providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtAuthGuard, JwtStrategy, GoogleAuthGuard, GoogleStrategy],
})
export class AuthModule { }