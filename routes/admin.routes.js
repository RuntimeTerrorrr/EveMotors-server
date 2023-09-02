import { Router } from "express";
import jwt from "jsonwebtoken";
import { carsModel } from "../models/cars.js";
import { userModel } from "../models/users.js";

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


adminRouter.post('/dashboard', async (req, res) => {
    const { year, make, model, tagline, topSpeed, power, torque, fuelCapacity, color, bodyType, registeredIn, assembledIn, imgLinkOne, imgLinkTwo, modelLink} = req.body;
    try {
        const newCar = await carsModel.create({
            year,
            make,
            model,
            tagline,
            topSpeed,
            power,
            torque,
            fuelCapacity,
            color,
            bodyType,
            registeredIn,
            assembledIn,
            imgLinkOne,
            imgLinkTwo,
            modelLink
        });

        res.status(201).json({ message: "The Car has been added.", newCar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while adding the car." });
    }
});


export default adminRouter;

