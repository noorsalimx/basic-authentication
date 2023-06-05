/**
 * dir/file: controllers\user.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:18:14 GMT+05:30
 */

const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../model/user.model');
const AuthService = require('../services/auth.service');
const Transaction = require('../model/transaction.model');
const authService = new AuthService();

class UserController {
  constructor() {}

  async getAllUser(request, response) {
    try {
      const users = await User.find({}, { password: 0 });
      return response.status(200).send(users);
    } catch (error) {
      console.log(error?.message);
      return response.status(500).send(error?.message);
    }
  }

  async signUp(request, response) {
    try {
      const { username, password } = request?.body;

      const user = await User.findOne({ username });
      if (user) {
        return response.status(409).send('username already exists');
      } else {
        const newUser = new User(_.pick(request?.body, ['name', 'username', 'password']));
        const salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
      }
      response.status(201).send('success');
    } catch (error) {
      console.log(error?.message);
      return response.status(500).send(error?.message);
    }
  }

  async signIn(request, response) {
    try {
      const { username, password } = request?.body;
      const user = await User.findOne({ username });
      if (!user) {
        return response.status(401).send('Please check your login credentials');
      }
      const verifiedOk = await bcrypt.compare(password, user.password);
      if (verifiedOk) {
        const payload = _.pick(user, ['name', 'username', 'isAdmin']);
        const token = await authService.generateToken(payload);
        return response.status(200).send({ ...payload, token });
      }
    } catch (error) {
      console.log(error?.message);
      return response.status(500).send(error?.message);
    }
  }

  async createUser(request, response) {
    try {
      const { username, password } = request?.body;

      const user = await User.findOne({ username });
      if (user) {
        return response.status(409).send('username already exists');
      } else {
        const newUser = new User(request?.body);
        const salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
      }
      response.status(201).send('success');
    } catch (error) {
      console.log(error?.message);
      return response.status(500).send(error?.message);
    }
  }

  async checkIn(request, response) {
    try {
      console.log(request?.body);
      const inData = _.pick(request?.body, ['name', 'username', 'inTime', 'checkInLocation']);
      // inData.checkInLocation = JSON.parse(inData.checkInLocation);
      if (
        !inData.username ||
        !inData?.inTime ||
        (!inData?.checkInLocation?.latitude && !inData?.checkInLocation?.longitude)
      ) {
        return response.status(400).send('required field is missing');
      }

      const transaction = new Transaction(inData);
      const result = await transaction.save();
      console.log(result);
      return response.status(201).send('success');
    } catch (error) {
      console.log(error.message);
      response.status(500).send(error.message);
    }
  }

  async checkOut(request, response) {
    try {
      console.log(request?.body);
      const outData = _.pick(request?.body, ['username', 'outTime', 'checkOutLocation']);
      const { username, outTime, checkOutLocation } = outData;
      if (!username || !outTime || (!checkOutLocation?.latitude && !checkOutLocation?.longitude)) {
        return response.status(400).send('required field is missing');
      }

      const transaction = await Transaction.find({ username: username, outTime: null });

      if (transaction.length == 1) {
        const result = await Transaction.updateOne(
          { username: username, outTime: null },
          { outTime, checkOutLocation },
          { new: true }
        );
        console.log(result);
        return response.status(200).send('success');
      } else {
        return response.status(400).send('more than 1 record found where user is not checked out');
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send(error.message);
    }
  }
}

module.exports = new UserController();
