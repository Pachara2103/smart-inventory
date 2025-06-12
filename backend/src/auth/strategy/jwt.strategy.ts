
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private configService: ConfigService) {
        const jwtSecret = configService.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in configuration');
        }

        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //เปลี่ยนให้ดึงผ่าน cookies
        //     ignoreExpiration: false,
        //     secretOrKey: jwtSecret,
        // });
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request & { cookies?: Record<string, string> }) => {
                    const raw = request?.cookies?.access_token;
                    console.log('raw ===', raw);
                    console.log('raw.access_token ===', raw.access_token);

                    return raw || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
            // passReqToCallback: true,

        });
    }

    async validate(payload: any) {
        return payload;
    }
}
