import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
// createdAt
// 2025-06-13T03:27:35.331+00:00
// updatedAt
// 2025-06-13T03:27:35.331+00:00
export class Product {
    @Prop({ unique: true }) //generate
    sku: string;

    @Prop({ unique: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    unit: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    addedBy: string;

    @Prop()
    imgPath: string;


}
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', async function (next) {
    //generate sku key
    if (this.sku) return next(); // ถ้ามี sku แล้วไม่ต้องทำอะไร

    const ProductModel = this.constructor as Model<ProductDocument>;

    // 🔍 เช็คว่ามี product ที่ชื่อเดียวกันใน DB ไหม
    const existingProduct = await ProductModel.findOne({ name: this.name });

    if (existingProduct) {
        // ถ้ามีสินค้าชื่อเดียวกัน ใช้ sku เดิม
        this.sku = existingProduct.sku;
    } else {
        // ถ้าไม่มี → generate sku ใหม่
        const count = await ProductModel.countDocuments();
        const nextNumber = count + 1;
        const paddedNumber = String(nextNumber).padStart(3, '0'); // 001, 002, ...
        this.sku = `PROD${paddedNumber}`;
    }

    next();
});