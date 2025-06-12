import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27019', {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: 'inventory',
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule { }
