const EventNotification = require('../models/eventNotification');

module.exports = {
    eventNotificationsIndex,
    markNotificationAsRead,
};

async function eventNotificationsIndex(req, res) {
    try {
        const user = req.user.sub;
        const notifications = await EventNotification.find({ user }).populate({
            path: 'event',
            populate: { path: 'location' },
        });
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching notifications');
    }
}

async function markNotificationAsRead(req, res) {
    try {
        const notificationId = req.params.id;
        const updatedNotification = await EventNotification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true }
        ).populate('event');

        if (!updatedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.json(updatedNotification);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error marking notification as read');
    }
}
