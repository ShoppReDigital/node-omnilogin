const debug = require('debug');
const rp = require('request-promise');

const authenticate = require('./oauth/authenticate');

const log = debug('omnilogin/index');

exports.callback = ({ client_id, client_secret, redirect_uri }) => async (req, res, next) => {
    try {
        const response = await rp({
            method: 'POST',
            uri: `${process.env.OMNILOGIN_URL}/oauth/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            form: {
                grant_type: 'authorization_code',
                redirect_uri,
                client_id,
                client_secret,
                code: req.query.code,
            },
            json: true,
        });

        const user = await rp({
            uri: `${process.env.OMNILOGIN_URL}/api/users/me?access_token=${response.access_token}`
        });

        return { tokens: response, user };
        // - ... Signup: you can update user details in you crm database
        // - ... Login: You can attach token to cookies or header
    } catch (err) {
        return res.status(500).json(err)
    }
};

exports.authenticate = authenticate;
