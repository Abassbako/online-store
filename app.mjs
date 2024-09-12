import userRoutes from "./routers/userRoutes.mjs";
import productRoutes from "./routers/productRoutes.mjs";
import orderRoutes from "./routers/orderRoutes.mjs";
import cartRoutes from "./routers/cartRoutes.mjs";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/api/v2/users', userRoutes);
app.use('/api/v2/products', productRoutes);
app.use('/api/v2/orders', orderRoutes);
app.use('/api/v2/carts', cartRoutes);

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

