const express = require('express');
const usersCtrl = require('../../controllers/users.js');
const ensureLoggedIn = require('../../middleware/ensure-logged-in.js');

const router = express.Router();

router.get('/', usersCtrl.allButCurrentUser);

// POST add a user
router.post('/', usersCtrl.create);

// POST login a user
router.post('/login', usersCtrl.login);

// GET check current user token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
