import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from 'src/schemas/history.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(History.name) private readonly historyModel: Model<HistoryDocument>,
        // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,

    ) { }

    async creatProduct(productDto: ProductDto): Promise<Product> {
        console.log('add product  === ', productDto);
        const newProduct = new this.productModel(productDto);

        const history = new this.historyModel({ sku: productDto.sku, quantity: productDto.quantity, description: `create new product by ${productDto.addBy}`, action: `creat new product` });
        await history.save();

        return newProduct.save(); //เข้า mongo
    }

    async getAllProduct(): Promise<ProductDocument[] | null> {
        return this.productModel.find().exec();
    }

    async getProduct(query: any) {
        if (!query) return this.productModel.find().exec();
        const filter: any = {};

        // ใช้ regex เพื่อให้ค้นหาแบบ partial match และไม่สน case
        if (query.name) filter.name = { $regex: new RegExp(query.name, 'i') };
        if (query.sku) filter.sku = { $regex: new RegExp(query.sku, 'i') };
        if (query.category) filter.category = { $regex: new RegExp(query.category, 'i') };
        if (query.unit) filter.unit = { $regex: new RegExp(query.unit, 'i') };
        if (query.addBy) filter.addBy = { $regex: new RegExp(query.addBy, 'i') };

        return this.productModel.find(filter).exec();
    }

    async sortByDate(sortdate: string) {
        const isSortDate = sortdate === 'true';
        const products = await this.productModel.find().sort({ createdAt: isSortDate ? -1 : 1 }); // -1 = ใหม่ไปเก่า, 1 = เก่าไปใหม่

        return products;
    }
    async updateQuantity(sku: string, amount: number, description: string) {
        // หา product ด้วย SKU
        const product = await this.productModel.findOne({ sku });

        const history = new this.historyModel({ sku: sku, quantity: product?.quantity, description: description, action: `Add,${amount}` });
        await history.save();

        if (!product) {
            throw new Error('Product not found');
        }
        const currentQty = product.quantity;
        product.quantity = currentQty + amount;


        await product.save();
        return product;
    }
}
