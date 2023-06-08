/**
 * dir/file: Routers\user.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T14:51:56 GMT+05:30
 */

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const AuthService = require('../services/auth.service');
const authService = new AuthService();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/checkIn', userController.checkIn);
router.post('/checkOut', userController.checkOut);
router.get('/transactions', authService.validateUser, userController.getTransactions);

module.exports = router;
