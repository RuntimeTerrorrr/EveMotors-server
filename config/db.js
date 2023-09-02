import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    try {

        const connection = await mongoose.connect(process.env.DATABASE_URL, {
            dbName: process.env.DATABASE_NAME
        });

        console.log("DataBase has been connected", connection.connection.host);
    }
    catch (err) {
        console.log(err);
    }
}
