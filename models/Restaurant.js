import mongoose from "mongoose";


const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Insert restaurant name"]
    },
    img:{
        type: String,
        required: true
    },

    location: {
        city: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        opening_hours: {
            type: String,
            required: true
        }
    },
    tags: [{
        type: String
    }],
}, {timestamps: true})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

export default Restaurant;