const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        public: { type: Boolean, default: false },
        restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('List', listSchema);
