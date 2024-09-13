import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 200,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1080,
    },
}, { 
    timestamps: true,
});

const userModel = mongoose.model('user', userSchema);

export default userModel;