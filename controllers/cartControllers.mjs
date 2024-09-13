import cartModels from "../models/cartModels.mjs";

const createCart = async (req, res) => {
    try {

    } catch (e) {
        console.error|(new Error(e));
        res.status(500).json(e);
    };
};

export default {
    createCart,
}