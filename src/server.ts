import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import bodyParser from 'body-parser';
import { Logging } from './library';
import { packRoutes, establishmentRoutes } from './routes';

const router = express();

/**
 * Connect to Mongo
 */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.log('Connected to the database');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect to the database: ');
        Logging.error(error);
    });

/**
 *  Only start the server if Mongo is connected
 */

const startServer = () => {
    router.use((req, res, next) => {
        Logging.log(`Incomming request -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.log(`Incomming request -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* Rules of the API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow_Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/', packRoutes);
    router.use('/', establishmentRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.log(`Server is running on port ${config.server.port}`));
};
