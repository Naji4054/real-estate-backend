import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        status: {type: String, enum: ['active','inactive'], default: 'inactive'},
        role: { type: String, enum: ['user', 'agent', 'admin'], default: 'user'},
        dob : {type: Date, required: true},
        country: { type: String, required: true},
        phone: { type: Number, required: true },
        
}, { timestamps: true });


const User = mongoose.model('User',userSchema)


export default User