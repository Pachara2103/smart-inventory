import { Module ,Global} from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    providers:[PrismaService],
    exports:[PrismaService], //allow other function that import this module allow to use Prismaservice //or use globla and can use everywhere
})

export class PrismaModule {}