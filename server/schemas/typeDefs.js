const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  type AuthToken {
    token: ID!
    user: User
  }

  type Post {
    _id: ID
    user: User
    message: String
    timestamp: String
  }

  type Attachment {
    _id: ID
    posts: [Post]
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input PostInput {
    user: ID!
    message: String
    timestamp: String
  }

  type Query {
    users: [User]
    posts: [Post]
    attachments: [Attachment]
    getAttachment(id: ID!): Attachment
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthToken
    login(username: String!, password: String!): AuthToken
    createPost(input: PostInput!): Post
    deleteUser(id: ID!): UserDeleteResponse
    deletePost(id: ID!): PostDeleteResponse
  }

  type UserDeleteResponse {
    success: Boolean
    message: String
  }

  type PostDeleteResponse {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;
