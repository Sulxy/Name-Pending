const typeDefs = `
  type user {
    _id: ID
    name: String
  }

  type Query {
    users: [user]
  }
`;

module.exports = typeDefs;
