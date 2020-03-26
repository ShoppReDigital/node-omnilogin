const rp = require('request-promise');

exports.getUserFromToken = (accessToken, withExpirty) => rp({
    uri: `${process.env.OMNILOGIN_URL}/api/users/me?access_token=${accessToken}&withExpiry=${withExpirty}`,
    json: true,
});

exports.getToken = (accessToken) => rp({
    uri: `${process.env.OMNILOGIN_URL}/api/users/token?access_token=${accessToken}`,
    json: true,
});
