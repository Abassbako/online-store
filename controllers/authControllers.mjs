import { ObjectId } from "mongodb";
import userModel from "../models/authModels.mjs";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: "31d"});
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let userExist = await userModel.findOne({email});

        if (userExist) return res.status(400).json('email address already exist');

        if (!name || !email || !password) return res.status('All fields are required!!!');

        if (!validator.isEmail(email)) return res.status(401).json('Not a valid email address');

        if (!validator.isStrongPassword(password)) return res.status(401).json('Password must be a strong one');

        const salt = await bcrypt.genSalt(10);

        userExist = await userModel(req.body);
        
        userExist.password = await bcrypt.hash(userExist.password, salt);

        await userExist.save();

        const token = createToken(userExist._id);
        res.status(201).json({name, email, password, token});
    } catch (e) {
        res.status(500).json(e);
        console.error(new Error(e));
    };
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });

        if (!userExist) return res.status(400).json('Invalid email or password');
    
        const isValidPassword = await bcrypt.compare(password, userExist.password);

        if (!isValidPassword) return res.status(401).json('Invalid email or password');

        const token = createToken(userExist._id); 
        return res.status(200).json({name: userExist.name, email, token})
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    ;}
};

const searchUser = async (req, res) => {                       
    const userId = req.params.userId;
    if (ObjectId.isValid(userId)) {
        try {
            const userId = req.params.userId;

            const searchedUser = await userModel.findById(userId);

            res.status(200).json(searchedUser);
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        }
    } else return res.status(400).json("Not a valid id");
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (ObjectId.isValid(userId)) {
            const updatedUser = await userModel.findByIdAndUpdate(userId, {$set: req.body}, {new: true});

            res.status(200).json(updatedUser);
        } else return res.status(400).json('Not a valid id');
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (ObjectId.isValid(userId)) {
            const deletedUser = await userModel.findByIdAndDelete(userId);

            res.status(200).json(deletedUser);
        } else return res.status(400).json("Not a valid id");
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

export { 
    createUser, 
    loginUser,
    searchUser,
    updateUser,
    deleteUser,
    allUsers,
};