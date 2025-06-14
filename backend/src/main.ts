import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  // app.enableCors();// can not send cookies
  app.enableCors({
    origin: 'http://localhost:5173', // ✅ URL ของ Frontend ของคุณ
    credentials: true,               // ✅ อนุญาตให้ส่ง cookies ด้วย
  });
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/', // URL prefix
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
