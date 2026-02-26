import express, {json} from "express";
import {router as apiRouter} from './router.js';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = express();

//parsery
//ContentType: application/json
app.use(json());

//fixing cors
app.use(cors());

//routes 
app.use('/', apiRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server ${HOST} nasluchuje na porcie ${PORT}`);
})
