// Importing necessary models
const { User, Post, Attachment } = require('../models');

// Defining resolvers for GraphQL queries
const resolvers = {
  Query: {
    // Resolver for fetching users with their posts and attachments
    users: async () => {
      // Finding all users and populating their 'post' field with associated posts
      return await User.find({}).populate('post').populate({
        // Populating 'post' field with 'attachment' field of each post
        path: 'post',
        populate: 'attachment'
      });
    },
    // Resolver for fetching posts with their attachments
    post: async () => {
      // Finding all posts and populating their 'attachment' field
      return await Post.find({}).populate('attachment');
    },
    // Resolver for fetching attachments
    attachment: async () => {
      // Finding all attachments
      return await Attachment.find({});
    }
  }
};

// Exporting resolvers
module.exports = resolvers;
