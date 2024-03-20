const express = require('express');
const router = express.Router();
const notificationsCtrl = require('../../controllers/eventNotifications');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET all notifications
router.get('/', ensureLoggedIn, notificationsCtrl.eventNotificationsIndex);

// PUT mark a notificationa s read
router.put('/:id', ensureLoggedIn, notificationsCtrl.markNotificationAsRead);

module.exports = router;
