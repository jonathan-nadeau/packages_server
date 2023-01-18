import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

import { Establishment, Pack } from './models';
import { Logging } from './library';
import config from './config/config';

faker.setLocale('fr_CA');

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(async () => {
        Logging.log('Connected to the database');
        await generateDataBase();
        process.exit();
    })
    .catch((error) => {
        Logging.error('Unable to connect to the database: ');
        Logging.error(error);
    });

const generateDataBase = async () => {
    await Establishment.deleteMany({});
    await Pack.deleteMany({});

    const establishmentIds: string[] = [];
    const fakeEstablishmentIds = [];

    for (let index = 0; index < 3; index++) {
        const _id = new mongoose.Types.ObjectId();
        fakeEstablishmentIds.push(_id);
        const establishment = new Establishment({
            _id,
            name: faker.company.name(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            website: faker.internet.url()
        });

        try {
            await establishment.save();
        } catch (error) {
            Logging.error(error);
        }
    }

    Logging.info('Establishments generated');

    for (let index = 0; index < 7; index++) {
        const _id = new mongoose.Types.ObjectId();
        const start_date = faker.date.soon();
        const end_date = faker.date.soon(1, start_date);

        const pack = new Pack({
            _id,
            name: faker.company.catchPhraseAdjective(),
            code: faker.random.alphaNumeric(6, { casing: 'upper' }),
            description: faker.commerce.productDescription(),
            categories: Array.from({ length: Math.floor(Math.random() * (4 - 1 + 1) + 1) }, faker.company.bsAdjective),
            establishment_id: fakeEstablishmentIds[Math.floor(Math.random() * 3)],
            start_date,
            end_date,
            price: faker.commerce.price(250, 3000),
            discount: faker.datatype.number({ min: 0, max: 75 }),
            premium: faker.datatype.boolean()
        });

        try {
            await pack.save();
        } catch (error) {
            Logging.error(error);
        }
    }

    Logging.info('Packs generated');
};
