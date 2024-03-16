const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../../controllers/restaurants');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET see a restaurant's details
router.get('/:id', ensureLoggedIn, restaurantsCtrl.show);

// POST add a restaurant to a list
router.post('/', ensureLoggedIn, restaurantsCtrl.addToList);

// DELETE remove restaurant from a list
router.delete('/:id', ensureLoggedIn, restaurantsCtrl.removeFromList);

module.exports = router;
