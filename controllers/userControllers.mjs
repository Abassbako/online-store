import userModel from "../models/userModels.mjs";
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
        const hashedPassword = userExist.password;
        let userExist = await userModel.findOne({email});

        if (userExist) return res.status(400).json('email address already exist');

        if (!name || !email || !password) return res.status('All fields are required!!!');

        if (!validator.isEmail(email)) return res.status(401).json('Not a valid email address');

        if (!validator.isStrongPassword(password)) return res.status(401).json('Password must be a strong one');

        const salt = await bcrypt.genSalt(10);

        const newUser = await userModel(req.body);
        
        hashedPassword = await bcrypt.hash(hashedPassword, salt);

        const saveUser = await newUser.save();

        const token = createToken(userExist._id);

        res.status(201).json({name, email, password, token});
    } catch (e) {
        res.status(500).json(e);
        console.error(new Error(e));
    };
};

export { createUser };