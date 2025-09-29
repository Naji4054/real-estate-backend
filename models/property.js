import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
  price: { 
    before: { type: Number, default: 0},
    after: { type: Number, default: 0 },
    priceExact: { type: Number, default: 0 },
  },
  taxRate: { type: Number, default: 0 },
  location : { type: String, required: true },
  category: { type: String, required: true },
  property: { type: String, enum: ['sale', 'rent'], default : 'sale'},
  locationPoint: {
    longitude: { type: String, default: 0 },
    latitude: { type: String, default: 0 },
  },
  details: {
    bedroom: { type: Number, default: 0},
    washroom: { type: Number, default: 0},
    area: { type: Number, default: 0},
    garage: { type: Number, default: 0},
    garagearea: { type: Number, default: 0},

  },
  media: [String],
  amenities: {
    furnished: { type: Boolean, defalut: false },
    kitchen: { type: Boolean, defalut: false },
    backyard: { type: Boolean, defalut: false },
    swimmingpool: { type: Boolean, defalut: false },
    ventilation: { type: Boolean, defalut: false },
    fireplace: { type: Boolean, defalut: false },
    elavator: { type: Boolean, defalut: false },
    garageattached: { type: Boolean, defalut: false },
  },
  completed: { type: String, default: false },    
},
{
  timestamps: true
}
)
const Property = mongoose.model('Property', propertySchema);
 
export default Property;