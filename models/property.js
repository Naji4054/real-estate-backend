import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
  price: { 
    before: { type: Number, default: 0},
    after: { type: Number, default: 0 },
    actual: { type: Number, default: 0 },
  },
  taxRate: { type: Number, default: 0 },
  location: {
    longitude: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 },
  },
  
})
const Property = mongoose.model('Property', propertySchema);
 
export default Property;