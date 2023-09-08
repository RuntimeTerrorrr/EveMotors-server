import { Router } from "express";
import jwt from "jsonwebtoken";
import { carsModel } from "../models/cars.js";
import { userModel } from "../models/users.js";
import multer  from "multer";

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

const upload = multer();


// const storage = diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, process.env.UPLOAD_PATH)
//     },
//     filename: (req, file, cb) => {
//         const filename = file.originalname.toLowerCase().split(' ').join('.')
//         cb(null, filename);
//     }
// });

// let upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "model/gltf+json") {
//             cb(null, true);
//         }
//         else {
//             cb(null, false)
//             return cb(new Error("Only GLTF extension is allowed!"));
//         }
//     }
// });

adminRouter.post('/dashboard', upload.single, async (req, res) => {
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
            modelCDN,
            fixedScaleValue,
            fixedTargetValue, 
        });
        res.status(201).json({ message: "The Car has been added.", newCar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
});


adminRouter.delete('/cars/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;

        const deletedCar = await carsModel.findByIdAndDelete({ _id: carId });

        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        return res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default adminRouter;