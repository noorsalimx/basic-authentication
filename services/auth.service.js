/**
 * dir/file: services\auth.service.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:18:30 GMT+05:30
 */

const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {}

  async generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1hr',
    });
    return token;
  }

  async validateAndDecodeToken(token) {
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
  }
}

module.exports = AuthService;
