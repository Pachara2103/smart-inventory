import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { History, HistorySchema } from 'src/schemas/history.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema
    }]),
    MongooseModule.forFeature([{
      name: History.name,
      schema: HistorySchema
    }]),

  ],


  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService, MongooseModule]
})
export class ProductModule { }
