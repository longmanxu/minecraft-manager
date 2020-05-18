'use strict';

const { tokens } = require('./tokens.json');

function authenticate(req, res, next) {
    const userToken = req.query['token'];

    if (typeof userToken === 'undefined') {
        console.log('Authentication failed: No token given');
        res.status(400).send('Authentication failed: No token given');
        return;
    }

    for (let i = 0; i < tokens.length; i++) {
        if (userToken === tokens[i]['tokenString']) {
            console.log('User authenticated:', tokens[i]['user']);
            return next();
        }
    }
    
    console.log('Authentication failed: Bad token: ' + userToken);
    res.status(400).send('Authentication failed: Bad token: ' + userToken);
    return;
}

module.exports ={
    authenticate
};
