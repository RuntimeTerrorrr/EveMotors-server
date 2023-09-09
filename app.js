import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.routes.js';
import mainRouter from './routes/main.routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
const port = 3000;
const app = express();

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors(corsOptions));
config();
connectDB();


app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRouter)
app.use('/main', mainRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


export default app;