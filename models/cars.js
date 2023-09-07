import mongoose, { Schema } from "mongoose"

const CarsSchema = new Schema({
    makeModel: {
        type: String,
        required: true,
    },
    variant: {
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
    intro: {
        type: String,
        required: true,
    },
    engine: {
        type: String,
        required: true,
    },
    power: {
        type: String,
        required: true,
    },
    torque: {
        type: String,
        required: true,
    },
    topSpeed: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    bodyType: {
        type: String,
        required: true,
    },
    imageLink1: {
        type: String,
        required: true,
    },
    imageLink2: {
        type: String,
        required: true,
    },
    imageLink3: {
        type: String,
        required: true,
    },
    imageLink4: {
        type: String,
        required: true,
    },
    modelCDN: {
        type: String,
        required: true,
    },
    fixedScaleValue: {
        type: String,
        required: true,
    },
     fixedTargetValue: {
        type: String,
        required: true,
    },
});

export const carsModel = mongoose.model("cars", CarsSchema);