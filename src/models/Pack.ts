import mongoose, { Document, Schema, SchemaValidator } from 'mongoose';
import { IEstablishmentModel } from './Establishment';

export interface IReview {
    scoreOutOfTen: number;
    description?: string;
}

export interface IPack {
    name: string;
    description: string;
    code: string;
    categories: string[];
    establishment_id: IEstablishmentModel['_id'];
    start_date: Date;
    end_date: Date;
    price: number;
    discount: number;
    premium: boolean;
    reviews?: IReview[];
}

export interface IPackModel extends IPack, Document {}

const PackSchema: Schema = new Schema<IPack>({
    code: { type: String, required: [true, 'code field is required'] },
    name: { type: String, required: [true, 'name field is required'], maxlength: [25, 'Name must contains a maximum of 25 characteres'] },
    description: { type: String, required: [true, 'description field is required'], maxlength: [250, 'Description must contains a maximum of 250 characteres'] },
    categories: { type: [String], required: [true, 'categories field is required'] },
    establishment_id: { type: String, required: [true, 'establishment field is required'] },
    start_date: { type: Date, required: [true, 'start_date field is required'] },
    end_date: { type: Date, required: [true, 'end_date field is required'] },
    price: { type: Number, required: [true, 'price field is required'] },
    discount: { type: Number, required: [true, 'price field is required'] },
    premium: { type: Boolean, required: [true, 'premium field is required'] },
    reviews: [
        new Schema({
            scoreOutOfTen: {
                type: Number,
                required: true,
                max: [10, 'Score cannot be more than 10']
            },
            description: String
        })
    ]
});

export const Pack = mongoose.model<IPackModel>('Package', PackSchema);
