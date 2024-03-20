const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/events');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET all user owned events
router.get('/', ensureLoggedIn, eventsCtrl.indexOwnEvents);

// GET all user invited events
router.get('/invited', ensureLoggedIn, eventsCtrl.indexInvitedEvents);

// GET all user owned & invited events
router.get('/allevents', ensureLoggedIn, eventsCtrl.indexOwnedAndInvitedEvents);

// POST Add an event
router.post('/', ensureLoggedIn, eventsCtrl.createEvent);

// GET Show an event details
router.get('/:id', eventsCtrl.show);

// PUT update an event
router.put('/:id', ensureLoggedIn, eventsCtrl.updateEvent);

// DELETE an event
router.delete('/:id', ensureLoggedIn, eventsCtrl.deleteEvent);

// PUT accept an event
router.put('/:id/accept', ensureLoggedIn, eventsCtrl.acceptEvent);

// PUT decline an event
router.put('/:id/decline', ensureLoggedIn, eventsCtrl.declineEvent);

module.exports = router;
