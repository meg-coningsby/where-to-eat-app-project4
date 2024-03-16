const express = require('express');
const router = express.Router();
const visitedCtrl = require('../../controllers/visited');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// POST add a restaurant to my visited list
router.post('/', ensureLoggedIn, visitedCtrl.addVisited);

// DELETE restaurant from my visited list
router.delete('/:id', ensureLoggedIn, visitedCtrl.deleteVisited);

module.exports = router;
