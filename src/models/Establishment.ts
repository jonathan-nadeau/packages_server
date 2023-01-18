import mongoose, { Document, Schema } from 'mongoose';

export interface IEstablishment {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    website: string;
}

export interface IEstablishmentModel extends IEstablishment, Document {}

const EstablishmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true }
});

export const Establishment = mongoose.model<IEstablishmentModel>('Establishment', EstablishmentSchema);
