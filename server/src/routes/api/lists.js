const express = require('express');
const router = express.Router();
const listsCtrl = require('../../controllers/lists');
const ensureLoggedIn = require('../../middleware/ensure-logged-in');

// GET api/lists
router.get('/', ensureLoggedIn, listsCtrl.index);

// POST Add a list api/notes
router.post('/', ensureLoggedIn, listsCtrl.addList);

// GET Show a list
router.get('/:id', ensureLoggedIn, listsCtrl.show);

// PUT update a list
router.put('/:id', ensureLoggedIn, listsCtrl.updateList);

// DELETE a list
router.delete('/:id', ensureLoggedIn, listsCtrl.deleteList);

module.exports = router;
