import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from 'src/schemas/history.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(History.name) private readonly historyModel: Model<HistoryDocument>,

    ) { }

    async creatProduct(productDto: ProductDto): Promise<Product> {
        console.log('add product  === ', productDto);
        const newProduct = new this.productModel(productDto);

        const history = new this.historyModel({
            name: productDto.name,
            sku: productDto.sku,
            category: productDto.category,
            quantity: productDto.quantity,
            price: productDto.price,
            unit: productDto.unit,
            description: `create new product`,
            action: `New`
        });
        await history.save();

        return newProduct.save(); //เข้า mongo
    }

    async getAllProduct(): Promise<ProductDocument[] | null> {
        return this.productModel.find().exec();
    }

    async getAllHistory(): Promise<HistoryDocument[] | null> {
        return this.historyModel.find().sort({createdAt:-1}).exec();
    }
    async getAllRecenlyAddedProduct(): Promise<HistoryDocument[] | null> {
        return this.historyModel.find({action:"New"}).sort({createdAt:-1}).exec();
    }

    async getProduct(q: any) {
        const value = q.value;
        const type = q.type;
        return this.productModel.find({ [type]: { $regex: `^${value}`, $options: 'i' } }).exec();
    }

    async getHistoryProduct(q: any) {
        const value = q.value;
        const type = q.type;
        return this.historyModel.find({ [type]: { $regex: `^${value}`, $options: 'i' } }).exec();
    }

    async sortType(sortType: string, asc: boolean) {
        if (sortType === "date") {
            const products = await this.productModel.find().sort({ createdAt: asc ? -1 : 1 });
            return products;
        }
        else if (sortType === "name") {
            const products = await this.productModel.find().sort({ name: asc ? -1 : 1 });
            return products;
        }
        else if (sortType === "price") {
            const products = await this.productModel.find().sort({ price: asc ? 1 : -1 });
            return products;
        } else if (sortType === "sku") {
            const products = await this.productModel.find().sort({ sku: asc ? -1 : 1 });
            return products;
        }
        return;
    }


    async selectCategory(category: string) {
        const products = await this.productModel.find({ category: category });
        return products;
    }

    async getAllCategory() {
        const categories = await this.productModel.distinct("category");
        return categories.length;
    }

    async updateQuantity(sku: string, amount: number, description: string, type: string, user: string) {
        const product = await this.productModel.findOne({ sku });
        if (!product) {
            throw new Error('Product not found');
        }
        const history = new this.historyModel({
            sku: sku,
            name: product.name,
            category: product.category,
            quantity: amount,
            unit: product.unit,
            description: description,
            action: type,
            user: user
        });

        await history.save();

        if (product.quantity - amount < 0 && type === "Req") {
            return "not enough quantity"
        }
        product.quantity = type === "Add" ? product.quantity + amount : product.quantity - amount;

        await product.save();
        return product;
    }
    async getSaleProduct() {
        const sale = await this.historyModel.aggregate([
            {
                $match: { action: "Req" }

            },
            {
                $group: {
                    _id: "$sku",
                    name: { $first: "$name" },
                    quantity: { $sum: "$quantity" },
                }
            }
        ]);


        return sale;
    }
    async getAllSaleProduct() {
         const allsale = await this.historyModel.aggregate([
            {
                $match: { action: "Req" }

            },
            {
                $group: {
                     _id: null, 
                    quantity: { $sum: "$quantity" },
                }
            }
        ]);

      return allsale[0]?.quantity || 0 ;
    }

    async saleSelectCategory(category: string) {
        if (category === "All") {
            const sale = await this.historyModel.aggregate([
                { $match: { action: "Req" } },
                {
                    $group: {
                        _id: "$sku",
                        name: { $first: "$name" },
                        quantity: { $sum: "$quantity" },
                    }
                }]);
            return sale;
        }
        else {

            const sale = await this.historyModel.aggregate([
                { $match: { action: "Req", category: category } },
                {
                    $group: {
                        _id: "$sku",
                        name: { $first: "$name" },
                        quantity: { $sum: "$quantity" },
                    }
                }
            ]);
            return sale;
        }

    }


}
