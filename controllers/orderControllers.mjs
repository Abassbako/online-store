import orderModels from "../models/orderModels.mjs";

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

export {
    createOrder,
}