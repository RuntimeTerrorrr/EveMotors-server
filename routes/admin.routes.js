import { Router } from "express";
import jwt from "jsonwebtoken";
import { carsModel } from "../models/cars.js";
import { userModel } from "../models/users.js";
import multer, { diskStorage } from "multer";

const adminRouter = Router();

const authenticationMiddleware = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    } catch (err) {
        console.error("Authentication Middleware Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

adminRouter.use(authenticationMiddleware);

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_PATH)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('.')
        cb(null, filename);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "model/gltf+json") {
            cb(null, true);
        }
        else {
            cb(null, false)
            return cb(new Error("Only GLTF extension is allowed!"));
        }
    }
});

adminRouter.post('/dashboard', upload.single, async (req, res) => {
    const { makeModel, variant, registeredIn, assembledIn, intro, engine, torque, power, topSpeed, bodyType, category, imageLink1, imageLink2, imageLink3, imageLink4, imageLink5, modelCDN, fixedScaleValue,
    } = req.body;

    try {
        const newCar = await carsModel.create({
            makeModel,
            variant,
            registeredIn,
            assembledIn,
            intro,
            engine,
            torque,
            power,
            topSpeed,
            bodyType,
            category,
            imageLink1,
            imageLink2,
            imageLink3,
            imageLink4,
            imageLink5,
            modelCDN,
            fixedScaleValue,
        });

        res.status(201).json({ message: "The Car has been added.", newCar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while adding the car." });
    }
});


export default adminRouter;

