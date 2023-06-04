/**
 * dir/file: routers\admin.route.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T23:35:30 GMT+05:30
 */

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const AuthService = require('../services/auth.service');
const authService = new AuthService();

router.get('/get-users', authService.isAdmin, userController.getAllUser);
router.post('/create-user', authService.isAdmin, userController.createUser);

module.exports = router;
