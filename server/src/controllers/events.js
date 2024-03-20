const Event = require('../models/event');
const EventNotification = require('../models/eventNotification');

module.exports = {
    indexOwnEvents,
    indexInvitedEvents,
    indexOwnedAndInvitedEvents,
    show,
    createEvent,
    updateEvent,
    deleteEvent,
    acceptEvent,
    declineEvent,
};

// All events that a user owns
async function indexOwnEvents(req, res) {
    try {
        const owner = req.user.sub;
        const events = await Event.find({ owner }).populate('location');
        res.json(events);
    } catch (error) {
        console.error('Error in indexOwnEvents function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// All events that a user is invited to (whether they are pending, declined or accepted)
async function indexInvitedEvents(req, res) {
    try {
        const userId = req.user.sub;
        const events = await Event.find({
            $or: [
                { invitedUsers: userId },
                { acceptedUsers: userId },
                { declinedUsers: userId },
            ],
        }).populate('location');
        res.json(events);
    } catch (error) {
        console.error('Error in indexInvitedEvents function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// All events - owned or invited
async function indexOwnedAndInvitedEvents(req, res) {
    try {
        const userId = req.user.sub;
        const events = await Event.find({
            $or: [
                { owner: userId },
                { invitedUsers: userId },
                { acceptedUsers: userId },
                { declinedUsers: userId },
            ],
        }).populate('location');
        res.json(events);
    } catch (error) {
        console.error('Error in indexInvitedEvents function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Show an event's detail
async function show(req, res) {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId)
            .populate('location')
            .populate('invitedUsers')
            .populate('acceptedUsers')
            .populate('declinedUsers')
            .populate('owner');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error in show function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create a new event (user becomes the owner) & notify the invitees (using eventNotifications)
async function createEvent(req, res) {
    try {
        const eventData = req.body;
        eventData.owner = req.user.sub;
        const event = await Event.create(eventData);

        // Add notification for the invited users
        const invitedUsers = eventData.invitedUsers;
        for (const userId of invitedUsers) {
            await EventNotification.create({
                user: userId,
                type: 'invite',
                event: event._id,
                read: false,
            });
        }

        res.status(201).json(event);
    } catch (error) {
        console.error('Error in createEvent function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update an event (only available to the owner) & notify invitees (if new ones added)
async function updateEvent(req, res) {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const userId = req.user.sub;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.owner.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Keep a copy of the old invitees
        const oldInvitees = new Set(
            event.invitedUsers.map((user) => user.toString())
        );

        await Event.findByIdAndUpdate(eventId, eventData);

        const updatedEvent = await Event.findById(eventId)
            .populate('location')
            .populate('invitedUsers')
            .populate('acceptedUsers')
            .populate('declinedUsers');

        // Find new invitees by comparing old list to updated list
        const newInvitees = updatedEvent.invitedUsers.filter(
            (user) => !oldInvitees.has(user._id.toString())
        );

        // Create a notification for each new invitee
        for (const invitee of newInvitees) {
            await Notification.create({
                user: invitee._id,
                type: 'invite',
                event: eventId,
                read: false,
            });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error in updateEvent function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete an event (only available to the owner)
async function deleteEvent(req, res) {
    try {
        const eventId = req.params.id;
        const userId = req.user.sub;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.owner.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorised' });
        }

        await Event.findByIdAndDelete(eventId);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error in deleteEvent function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Accept an invite - they can only be one of the invited users
async function acceptEvent(req, res) {
    try {
        const eventId = req.params.id;
        const userId = req.user.sub;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.invitedUsers.includes(userId)) {
            return res
                .status(403)
                .json({ error: 'User is not invited to this event' });
        }

        if (event.acceptedUsers.includes(userId)) {
            return res
                .status(400)
                .json({ error: 'User has already accepted this event' });
        }

        event.invitedUsers.pull(userId);
        event.acceptedUsers.push(userId);
        await event.save();

        // Create a notification for the event owner
        await EventNotification.create({
            user: event.owner,
            event: eventId,
            type: 'inviteAccepted',
            read: false,
        });

        res.json({ message: 'Event accepted successfully' });
    } catch (error) {
        console.error('Error in acceptEvent function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Decline an invite - they can only be one of the invited users
async function declineEvent(req, res) {
    try {
        const eventId = req.params.id;
        const userId = req.user.sub;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.invitedUsers.includes(userId)) {
            return res
                .status(403)
                .json({ error: 'User is not invited to this event' });
        }

        if (event.declinedUsers.includes(userId)) {
            return res
                .status(400)
                .json({ error: 'User has already declined this event' });
        }

        event.invitedUsers.pull(userId);
        event.declinedUsers.push(userId);
        await event.save();

        // Create a notification for the event owner
        await EventNotification.create({
            user: event.owner,
            event: eventId,
            type: 'inviteDeclined',
            read: false,
        });

        res.json({ message: 'Event declined successfully' });
    } catch (error) {
        console.error('Error in declineEvent function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
