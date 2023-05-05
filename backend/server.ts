import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserController from './controllers/UserController';
import errorHandler from './middlewares/ErrorMiddleware';
import {body} from 'express-validator';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;
const uri: string = process.env.DB_CONN_STRING!;

app.use(express.json());
app.use(cookieParser());
app.use(cors())

mongoose.connect(uri).then((): void => {
    console.log('Подключено к MongoDB');
}).catch((error): void => {
    console.error(error);
});

app.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 30}),
    UserController.registration
);
app.post('/login', UserController.login);
app.post('/logout', UserController.logout);
app.get('/activate/:link', UserController.activate);
app.get('/refresh', UserController.refresh);
app.get('/users', UserController.getUsers);

app.use(errorHandler);

app.listen(port, (): void => {
    console.log(`Сервер запущен на порте ${port}`);
});