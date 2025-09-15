import mongoose from "mongoose"


const latestSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    bedroom: { type: Number, default: 0 },
    washroom: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    category: {type: String, required: true }
})

const Latest = mongoose.model('Latest', latestSchema)

export default Latest
