import mongoose, { Schema } from "mongoose"

const CarsSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    topSpeed: {
        type: Number,
        required: true,
    },
    power: {
        type: Number,
        required: true,
    },
    torque: {
        type: Number,
        required: true,
    },
    fuelCapacity: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    bodyType: {
        type: String,
        required: true,
    },
    registeredIn: {
        type: String,
        required: true,
    },
    assembledIn: {
        type: String,
        required: true,
    },
    imgLinkOne: {
        type: String,
        required: true,
    },
    imgLinkTwo: {
        type: String,
        required: true,
    },
    modelLink: {
        type: String,
        required: true,
    },
});

export const carsModel = mongoose.model("cars", CarsSchema);