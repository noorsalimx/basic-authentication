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
    console.log('admin', decode);
    return decode;
  }

  async isAdmin(request, response, next) {
    const { headers } = request;
    const accessToken = headers?.authorization || headers?.token;
    console.log(accessToken);
    if (accessToken?.includes('Bearer')) {
      const [_, token] = accessToken.split(' ');
      const auth = new AuthService();
      const user = await auth.validateAndDecodeToken(token);
      if (user.isAdmin) {
        next();
      } else {
        response.status(401).send('You are not authorized to create an user');
      }
    } else {
      response.status(401).send('Not Authorized');
    }
  }
}

module.exports = AuthService;
