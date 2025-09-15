import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
        firstName: String,
        lastName: String,
        email: { type: String, required: true, unique: true},
        password: String,
        status: String
});


const User = mongoose.model('User',userSchema)


export default User