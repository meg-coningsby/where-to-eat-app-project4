const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventNotificationsSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        type: {
            type: String,
            enum: ['invite', 'inviteAccepted', 'inviteDeclined'],
            required: true,
        },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('EventNotification', eventNotificationsSchema);
