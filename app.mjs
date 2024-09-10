import userRoutes from "./routers/userRoutes.mjs";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL

mongoose.connect(uri)
.then(() => {
    console.log('MongoDB Connection Successful');
})
.catch((e) => {
    console.error(new Error(`MongoDB Connection Error: ${e.message}`));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

