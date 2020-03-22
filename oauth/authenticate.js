const debug = require('debug');

const oAuth = require('./');

const log = debug('omnilogin/oauth/authenticate');

module.exports = () => (req, res, next) => {
  if (req.user) return next();
  return oAuth.authorise()(req, res, (data) => {
    if (req.user) {
      Object.assign(req.user, {
        app_id: req.oauth.bearerToken.app_id,
        user_type: req.oauth.bearerToken.user_type,
      });
    }

    return next(data);
  });
};
