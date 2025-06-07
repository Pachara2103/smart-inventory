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

    ],
    controllers: [AuthController],
    providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtAuthGuard, JwtStrategy],
})
export class AuthModule { }