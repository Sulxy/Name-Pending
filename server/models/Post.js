const { Schema, model } = require('mongoose');
const moment = require('moment');

// Define the schema for a chat message
const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 2000
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
    }
);

// Virtual for formatted timestamp // local time
postSchema.virtual('formattedTimestamp').get(function() {
    return this.timestamp.toLocaleString();
  });
// Define a model for the chat messages
const Post = model('Post', postSchema);

module.exports = Post;