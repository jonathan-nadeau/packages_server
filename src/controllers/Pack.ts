import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Pack, IReview } from '../models';

const createPack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, categories, start_date, end_date, price, discount, premium, establishment_id } = req.body;

        const _id = new mongoose.Types.ObjectId();
        const code: string = _id.toString().slice(-6);
        const reviews: IReview[] = [];

        const pack = new Pack({
            _id,
            code,
            name,
            description,
            categories,
            establishment_id,
            start_date,
            end_date,
            price,
            discount,
            premium,
            reviews
        });

        try {
            const response = await pack.save();
            if (response.errors) throw new Error(response.errors.message);
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(400).json({ error });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getPack = async (req: Request, res: Response, next: NextFunction) => {
    const { pack_id } = req.params;

    try {
        const response = await Pack.findById(pack_id);
        return response ? res.status(200).json({ response }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllPacks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const packs = await Pack.find();
        return res.status(200).json(packs);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateOrDeleteWithoutIdParams = (req: Request, res: Response) => {
    return res.status(400).json({ error: 'You must provide a valid id' });
};

const updatePack = async (req: Request, res: Response, next: NextFunction) => {
    const { pack_id } = req.params;

    const pack = await Pack.findById(pack_id);

    try {
        if (!pack) throw new Error();
    } catch (error) {
        return res.status(500).json({ error });
    }
    pack.set(req.body);

    try {
        const response = await pack.save();
        console.log(response);
        return res.status(200).json({ response });
    } catch (error: any) {
        const err = error.errors[Object.keys(error.errors)[0]].message;
        return res.status(500).json({ error: err });
    }
};

const deletePack = async (req: Request, res: Response, next: NextFunction) => {
    const { pack_id } = req.params;

    try {
        const pack = await Pack.findByIdAndDelete(pack_id);
        return pack ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const packController = {
    createPack,
    getPack,
    getAllPacks,
    updatePack,
    deletePack,
    updateOrDeleteWithoutIdParams
};

export default packController;
