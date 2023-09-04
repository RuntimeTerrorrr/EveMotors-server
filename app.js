import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.routes.js';
import mainRouter from './routes/main.routes.js';
import { connectDB } from './config/db.js';
import multer from 'multer';
import cors from 'cors';
const port = 3000;

const upload = multer;
const app = express();

config();
connectDB();

app.use(upload.array());
app.use(bodyParser.json());
app.use(cors());

app.use('/admin' , adminRouter)
app.use('/main' , mainRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


export default app;