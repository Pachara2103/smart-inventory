import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) { //async because it call prisma
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                select: {
                    id: true,
                    email: true,
                    updatedAt: true,
                    createdAt: true,
                }

            });
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'already have this',
                    );
                }
            } else {
                throw error;
            }
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,

            },
        });

        if (!user) throw new ForbiddenException(
            'this do not exists',
        );

        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );

        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

    }

}

