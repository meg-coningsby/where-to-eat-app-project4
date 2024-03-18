const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        date: { type: Date, required: true },
        invitedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        acceptedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        declinedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
