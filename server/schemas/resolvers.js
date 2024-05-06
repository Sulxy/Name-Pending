const bcrypt = require('bcryptjs'); // For comparing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('post').populate({
        path: 'post',
        populate: 'attachment'
      });
    },
    posts: async () => {
      return await Post.find({}).populate('attachment');
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error('Email is already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // Create the user
        const user = new User({
          username: input.username,
          email: input.email,
          password: hashedPassword
        });

        // Save the user to the database
        const newUser = await user.save();

        // Generate JWT token for the newly created user (optional)
        const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1d' });

        return {
          user: newUser,
          token
        };
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    deleteUser: async (_, { userId }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }

        // Check if the authenticated user is the same as the user being deleted
        if (context.user.userId !== userId) {
          throw new Error('Unauthorized: You can only delete your own account');
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
          throw new Error('User not found');
        }

        return {
          message: 'User deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return {
          user,
          token
        };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },
    getUserProfile: async (_, __, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }

        // Find the authenticated user by ID
        const user = await User.findById(context.user.userId);
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to get user profile: ${error.message}`);
      }
    }
  }
};

module.exports = resolvers;