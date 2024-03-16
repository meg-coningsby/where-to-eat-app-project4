const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../../controllers/restaurants');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// POST add a restaurant to a list
router.post('/', ensureLoggedIn, restaurantsCtrl.addToList);

// DELETE remove restaurant from a list
router.delete(
    '/:listId/:restaurantId',
    ensureLoggedIn,
    restaurantsCtrl.removeFromList
);

module.exports = router;
