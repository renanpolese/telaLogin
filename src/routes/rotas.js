const express = require('express')
const router = express.Router();
const userController = require('../controllers/UserController.js');
const path = require('path');
const authController = require('../controllers/AuthController.js');

router.post("/users/auth", authController.login);

//router.get("/users", userController.listUsers);
router.post("/users", userController.postUsers);
router.delete("/users/:id", userController.deleteUser);

router.get("/home");

module.exports = router;

