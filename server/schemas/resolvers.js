const { User, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('posts');
    },
    posts: async () => {
      return await Post.find({}).limit(2000);
    }
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (_, { input }) => {
      try {
        const post = new Post({
          user: input.user,
          message: input.message,
          timestamp: new Date().toISOString()
        });

        const newPost = await post.save();

        return newPost;
      } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
      }
    },
    deletePost: async (_, { id }) => {
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
          return { success: true, message: "Post deleted successfully." };
        } else {
          return { success: false, message: "Post not found." };
        }
      } catch (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
          return { success: true, message: "User deleted successfully." };
        } else {
          return { success: false, message: "User not found." };
        }
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    }
  }
};

module.exports = resolvers;
