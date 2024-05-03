const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Post {
    user: User
    message: String
    timestamp: Date
  }
  type Query {
    users: [User]
    posts: [Post]
  }
`;

module.exports = typeDefs;
