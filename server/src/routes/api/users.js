const express = require('express');
const usersCtrl = require('../../controllers/users.js');
const ensureLoggedIn = require('../../middleware/ensure-logged-in.js');

const router = express.Router();

router.get('/', usersCtrl.allButCurrentUser);
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
