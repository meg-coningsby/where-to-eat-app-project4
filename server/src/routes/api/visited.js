const express = require('express');
const router = express.Router();
const visitedCtrl = require('../../controllers/visited');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET see all your restaurant visits
router.get('/', ensureLoggedIn, visitedCtrl.index);

// POST add a restaurant to my visited list
router.post('/', ensureLoggedIn, visitedCtrl.addVisited);

// DELETE restaurant from my visited list
router.delete('/:id', ensureLoggedIn, visitedCtrl.deleteVisited);

module.exports = router;
