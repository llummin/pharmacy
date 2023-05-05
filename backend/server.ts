import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DB_CONN_STRING!;

app.use(express.json());
app.use(cookieParser());
app.use(cors)

mongoose.connect(uri).then(() => {
    console.log('Подключено к MongoDB');
}).catch((error) => {
    console.error(error);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});