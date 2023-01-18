import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Pack } from '../models';
import { IReview } from '../models';

const createPack = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, categories, start_date, end_date, price, discount, premium, establishment_id } = req.body;

    const _id = new mongoose.Types.ObjectId();
    const code: string = name.slice(0, 3) + _id.toString().slice(0, 3);
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
        if (!response) throw new Error();
        return res.status(200).json({ response });
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

const updatePack = async (req: Request, res: Response, next: NextFunction) => {
    const { pack_id } = req.params;

    try {
        const pack = await Pack.findById(pack_id);
        if (pack) {
            pack.set(req.body);

            try {
                const response = await pack.save();
                if (!response) throw new Error();
                res.status(200).json({ response });
            } catch (error) {
                return res.status(500).json({ error });
            }
        } else {
            return res.status(400).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
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
    deletePack
};

export default packController;
