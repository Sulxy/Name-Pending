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

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Post

  input UserInput {
    username: String
    email: String
    password: String
  }

  input PostInput {
    user: ID!
    message: String
    timestamp: Date
  }
`;

module.exports = typeDefs;
