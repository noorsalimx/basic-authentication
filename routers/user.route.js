/**
 * dir/file: Routers\user.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T14:51:56 GMT+05:30
 */

const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/signUp').post(userController.signUp);
router.route('/signIn').post(userController.signIn);

module.exports = router;
