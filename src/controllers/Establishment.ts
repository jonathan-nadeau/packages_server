import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Establishment } from '../models/';

const createEstablishment = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, city, phone, email, website } = req.body;

    const _id = new mongoose.Types.ObjectId();

    const establishment = new Establishment({
        _id,
        name,
        address,
        city,
        phone,
        email,
        website
    });

    try {
        const response = await establishment.save();
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getEstablishment = async (req: Request, res: Response, next: NextFunction) => {
    const { establishment_id } = req.params;
    console.log(establishment_id);
    try {
        const response = await Establishment.findById(establishment_id);
        return response ? res.status(200).json({ response }) : res.status(400).json({ message: 'Not found' });
    } catch (error) {}
};

const getAllEstablishments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const establishments = await Establishment.find();
        return res.status(200).json(establishments);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateEstablishment = async (req: Request, res: Response, next: NextFunction) => {
    const { establishment_id } = req.params;

    try {
        const establishment = await Establishment.findById(establishment_id);
        if (establishment) {
            establishment.set(req.body);

            try {
                const response = await establishment.save();
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

const deleteEstablishment = async (req: Request, res: Response, next: NextFunction) => {
    const { establishment_id } = req.params;

    try {
        const establishment = await Establishment.findByIdAndDelete(establishment_id);
        return establishment ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const establishmentController = { createEstablishment, getEstablishment, getAllEstablishments, updateEstablishment, deleteEstablishment };

export default establishmentController;
