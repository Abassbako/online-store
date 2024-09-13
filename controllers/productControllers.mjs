import productModels from "../models/productModels.mjs";
import { ObjectId } from "mongodb";

// Creating a new product
const newProducts = async (req, res) => {
    const ProductID = req.body.ProductID;
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Currency = req.body.Currency;
    const StockQuantity = req.body.StockQuantity;
    try {
        var ProductIDExist = await productModels.findOne({ProductID}) 

        if (ProductIDExist) return res.status(400).json('ProductID already exist...');

        ProductIDExist = new productModels(req.body);

        if (!ProductID || !Name || !Price || !Currency || !StockQuantity) {
            return res.status(400).json('Some fields are missing');
        }

        const saveProduct = await ProductIDExist.save();

        res.status(201).json(saveProduct);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// Searching for products
const searchProducts = async (req, res) => {
    const {_id} = req.params;
    try {
        if (ObjectId.isValid(_id)) {
            const searchedProduct = await productModels.findById(_id);

            if(!searchedProduct) return res.status(403).json('Product not found')

            res.status(200).json(searchedProduct);
        } else return res.status(400).json('Not a valid id');
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// Updating products
const updateProducts = async (req, res) => {
    const {id} = req.params;
    try {
        if (ObjectId.isValid(id)) {
            const updatedProducts = await productModels.findByIdAndUpdate(id, 
                {
                    $set: req.body,
                }, {
                    new: true,
                });

                res.status(200).json(updatedProducts);
        } else return res.status(400).json('Not a valid id');
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// Deleting products
const deleteProducts = async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const deletedProducts = await productModels.findByIdAndDelete(req.params.id);

            res.status(200).json(deletedProducts);
        }
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

// List of products
const getProducts = async (req, res) => {
    try {
        const products = await productModels.find();

        res.status(200).json(products);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

export {
    newProducts,
    updateProducts,
    deleteProducts,
    searchProducts,
    getProducts,
}