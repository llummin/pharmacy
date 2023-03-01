import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DB_CONN_STRING!;

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error(error);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
