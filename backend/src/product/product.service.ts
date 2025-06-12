import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }


    async addProduct(productDto: ProductDto): Promise<Product> {
        console.log('add product  === ', productDto);
        const newProduct = new this.productModel(productDto);
        return newProduct.save(); //เข้า mongo
    }

    async getAllProduct(): Promise<ProductDocument[] | null> {
        return this.productModel.find().exec();
    }

    async getProduct(query: any) {
        if(!query) return this.productModel.find().exec();
        const filter: any = {};

        // ใช้ regex เพื่อให้ค้นหาแบบ partial match และไม่สน case
        if (query.name) filter.name = { $regex: new RegExp(query.name, 'i') };
        if (query.sku) filter.sku = { $regex: new RegExp(query.sku, 'i') };
        if (query.category) filter.category = { $regex: new RegExp(query.category, 'i') };
        if (query.unit) filter.unit = { $regex: new RegExp(query.unit, 'i') };
        if (query.addBy) filter.addBy = { $regex: new RegExp(query.addBy, 'i') };

        return this.productModel.find(filter).exec();
    }
}
