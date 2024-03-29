const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitedSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
        visitDate: { type: Date },
        comments: { type: String },
        rating: { type: Number, min: 1, max: 5 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Visited', visitedSchema);
