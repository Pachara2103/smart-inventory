import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema()

export class Sale {
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
    buyer: string;

    @Prop({ default: () => new Date() })
    createdAt: Date;


}
export const SaleSchema = SchemaFactory.createForClass(Sale);