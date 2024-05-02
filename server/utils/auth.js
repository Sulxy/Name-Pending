const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ context }, next) {
    // extract token from GraphQL context
    const token = context.token;

    if (!token) {
      throw new Error("You need to be logged in to do that!")
    }
  
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch {
      console.log('Invalid token');
      throw new Error("Invalid token!")
    }

    // send to next endpoint
    return next();
  },

  // Generates token based on user data provided 
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};