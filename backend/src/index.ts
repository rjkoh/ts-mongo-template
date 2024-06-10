import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { isAuthenticated } from './middlewares';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

// Prefix routes:
app.use('/api/users', usersRouter);

const PORT = 3000;

// Conencting to MongoDB:
const MONGO_URL = `mongodb+srv://silastaysl:${process.env.MONGO_PASSWORD}@test.hefrqju.mongodb.net/?retryWrites=true&w=majority&appName=Test`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.get("/protected", isAuthenticated, (request: Request, response: Response) => {
    response.send("This is a protected route!");
});

app.get("/", (request: Request, response: Response, next: NextFunction) => {
    response.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
});