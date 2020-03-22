const debug = require('debug');
const jwt = require('jsonwebtoken');

const log = debug('omnilogin/oauth/model');

const oAuthModel = {
  getAccessToken(bearerToken, callback) {
    log('getAccessToken', JSON.stringify(bearerToken));

    try {
      const user = jwt.verify(bearerToken, process.env.OMNILOGIN_SECRET);
      return callback(null, user);
    } catch (err) {
      return callback(err, { access_token: bearerToken, expires: new Date(0) });
    }
  },
};

module.exports = oAuthModel;
