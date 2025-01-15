const express = require('express');
const router = express.Router();
const usersController = require('../controllers/Userscontroller');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/username/:username', usersController.getUserByUsername);
router.put('/username/:username', usersController.updateUser);
router.delete('/username/:username', usersController.deleteUser);

module.exports = router;
