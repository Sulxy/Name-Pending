const { User, Post, Attachment } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('post').populate({
        path: 'post',
        populate: 'attachment'
      });
  },
  post: async () => {
    return await Post.find({}).populate('attachment');
  },
  attachment: async () => {
    return await Attachment.find({});
    }
  }
};

module.exports = resolvers;
