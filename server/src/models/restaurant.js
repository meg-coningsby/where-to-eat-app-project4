const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        googlePlaceId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        visited: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
