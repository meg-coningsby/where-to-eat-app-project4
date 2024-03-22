const express = require('express');
const router = express.Router();
const visitedCtrl = require('../../controllers/visited');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET see all your restaurant visits
router.get('/', ensureLoggedIn, visitedCtrl.index);

// POST add a restaurant from my lists to visited
router.post('/', ensureLoggedIn, visitedCtrl.addVisited);

// POST add a restaurant from the search to visited
router.post('/search', ensureLoggedIn, visitedCtrl.addVisitedFromSearch);

// DELETE restaurant from my visited list
router.delete('/:id', ensureLoggedIn, visitedCtrl.deleteVisited);

// GET checkcs if a restaurant has been visited
router.get(
    '/check-visited/:restaurantId',
    ensureLoggedIn,
    visitedCtrl.checkIfVisited
);

module.exports = router;
