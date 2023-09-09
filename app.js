import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.routes.js';
import mainRouter from './routes/main.routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app = express();

const allowedOrigins = ['https://eve-motors-app.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
config();
connectDB();

app.use(bodyParser.json());

app.use('/admin', adminRouter)
app.use('/main', mainRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

export default app;
