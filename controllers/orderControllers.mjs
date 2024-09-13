import { ObjectId } from "mongodb";
import orderModels from "../models/orderModels.mjs";

// Creating a new order
const createOrder = async (req, res) => {
    const userId = req.body.userId;
    const items = req.body.items;
    const totalAmount = req.body.totalAmount;
    try {
        const _id = await orderModels.findOne({ userId });

        if (_id ) return res.status(400).json('userId already exist');
        
        if (!userId || !items || !totalAmount) {
        return res.status(400).json('All fields with * are required');
        }
        const order = new orderModels(req.body);

        const saveOrder = await order.save();
    
        res.status(201).json(saveOrder);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// Search orders
const searchOrder = async (req, res) => {
    const { _id } = req.params;
    try {
        if (ObjectId.isValid(_id)) {
            const orderId = await orderModels.findById(_id);

            if (orderId) return res.status(200).json(orderId);
            else return res.status(404).json('This order has not been made');
        } else return res.status(400).json('Not a valid id');
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
};

// Updating orders
const updateOrder = async (req, res) => {
    const {_id} = req.params; 
    if (ObjectId.isValid(_id)) {
        try {
            const orderId = await orderModels.findByIdAndUpdate(_id, {
                $set: req.body,
            },
            {
                new: true,
            });
            res.status(200).json(orderId);
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(400).json(e);
};

// Delete orders
const cancelOrders = async (req, res) => {
    const _id = req.params._id
    try {
        if (ObjectId.isValid(_id)) {
            const deletingOrder = await orderModels.findByIdAndDelete(_id);

            res.status(200).json(deletingOrder);
        }
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// List of orders
const myOrders = async (req, res) => {
    try {
        const orders = await orderModels.find();

        res.status(200).json(orders);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

export {
    createOrder,
    searchOrder,
    updateOrder,
    cancelOrders,
    myOrders,
}