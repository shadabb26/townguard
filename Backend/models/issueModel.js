const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./userModel');

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Issue must have a Title'],
      validate: {
        validator: function(value) {
          return validator.isAlpha(value.replace(/\s/g, ''));
        }
      }
    },
    description: {
      type: String,
      required: [true, 'Issue must have a description'],
      validate: {
        validator: function(value) {
          return validator.isAlpha(value.replace(/\s/g, ''));
        }
      }
    },
    rejectionReason: {
      type: String
    },
    resolveImg:{
      type:String
    },
    imageOne: {
      type: String,
      required: [true, 'Issue must have a Image']
    },
    imageTwo: {
      type: String,
      required: ['true', 'Issue muts have a Image']
    },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'rejected'],
      default: 'pending'
    },
    raisedDate: {
      type: Date,
      default: Date.now
    },
    closedDate: {
      type: Date,
      default: null
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Issue should be posted by user']
    },
    resolver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
