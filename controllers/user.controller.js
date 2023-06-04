/**
 * dir/file: controllers\user.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:18:14 GMT+05:30
 */

const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../model/user.model');
const AuthService = require('../services/auth.service');
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
        const newUser = new User(
          _.pick(request?.body, ['name', 'username', 'password'])
        );
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
}

module.exports = new UserController();
