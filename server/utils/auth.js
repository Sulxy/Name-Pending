const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '7d';

// Copied from Week 21 - Activity 24_Stu_Decode-JWT
module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
