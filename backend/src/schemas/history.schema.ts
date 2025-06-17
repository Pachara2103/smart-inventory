import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: true })
// createdAt
// 2025-06-13T03:27:35.331+00:00
// updatedAt
// 2025-06-13T03:27:35.331+00:00
export class History {
    @Prop({ required: true }) //generate
    sku: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    unit: string;

    @Prop()
    description: string;

    @Prop()
    action: string;

    @Prop()
    user: string;

}
export const HistorySchema = SchemaFactory.createForClass(History);