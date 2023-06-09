const jwt = require('jsonwebtoken');

const secret = 'cashmeoutside';
const expiration = '1h';

module.exports = {
  signToken: function ({ email, lastname, ssn }) {
    const payload = { email, lastname, ssn };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};