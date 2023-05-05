import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userController from "./controllers/UserController";

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

app.post('/registration', userController.registration);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.get('/activate/:link', userController.activate);
app.get('/refresh', userController.refresh);
app.get('/users', userController.getUsers);

app.listen(port, (): void => {
    console.log(`Сервер запущен на порте ${port}`);
});