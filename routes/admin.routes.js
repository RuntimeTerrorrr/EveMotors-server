import { Router } from "express";
import jwt from "jsonwebtoken";
import { carsModel } from "../models/cars.js";
import { userModel } from "../models/users.js";
import multer from "multer";
import path from "path";
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


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

adminRouter.post('/dashboard', upload.single(), async (req, res) => {
    const {
        makeModel,
        variant,
        registeredIn,
        assembledIn,
        intro,
        engine,
        transmission,
        displacement,
        torque,
        power,
        topSpeed,
        bodyType,
        category,
        imageLink1,
        imageLink2,
        imageLink3,
        imageLink4,
        coverImageUrl,
        modelCDN,
        fixedScaleValue,
        fixedTargetValue,
    } = req.body;

    try {
        const newCar = await carsModel.create({
            makeModel,
            variant,
            registeredIn,
            assembledIn,
            intro,
            engine,
            transmission,
            displacement,
            torque,
            power,
            topSpeed,
            bodyType,
            category,
            imageLink1,
            imageLink2,
            imageLink3,
            imageLink4,
            coverImageUrl,
            modelCDN,
            fixedScaleValue,
            fixedTargetValue,
        });
        res.status(201).json({ message: "The Car has been added.", newCar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not add the car." });
    }
});

adminRouter.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }


    const uploadedFilePath = req.file.path;


    return res.status(200).json({ message: "File uploaded and saved successfully", uploadedFilePath });
});

adminRouter.delete('/api/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId);
    const index = cars.findIndex((car) => car.id === carId);
  
    if (index === -1) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      cars.splice(index, 1);
      res.json({ message: 'Car deleted successfully' });
    }
  });

export default adminRouter;