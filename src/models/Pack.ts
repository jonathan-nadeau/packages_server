import mongoose, { Document, Schema } from 'mongoose';
import { IEstablishmentModel } from './Establishment';
import { string } from 'joi';

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

const PackSchema: Schema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true },
    establishment_id: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    premium: { type: Boolean, required: true },
    reviews: [
        new Schema({
            scoreOutOfTen: {
                type: Number,
                required: true
            },
            description: String
        })
    ]
});

export const Pack = mongoose.model<IPackModel>('Package', PackSchema);
