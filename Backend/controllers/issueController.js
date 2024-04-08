const { mongoose } = require('mongoose');
const Issue = require('./../models/issueModel');
const User = require('./../models/userModel');
const sendEmail = require('../utils/email');
const uploadOnCloudinary = require('./../utils/cloudinary');


exports.getIssues = async (_, res) => {
  const issues = await Issue.find();
  res.status(200).json({
    status: 'success',
    results: issues.length,
    data: {
      issues
    }
  });
};

exports.getIssueByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const issue = await Issue.find({ user_id: userId });
    res.status(200).json({
      status: 'success',
      results: issue.length,
      data: {
        issue
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong !'
    });
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const { id } = req.query;
    const issue = await Issue.find({ _id: id });
    res.status(200).json({
      status: 'success',
      data: {
        issue
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong !'
    });
  }
};

exports.postIssues = async (req, res) => {
  try {
    const { title, description, street, city, longitude, latitude } = req.body;

    console.log(latitude, longitude);
    // Validate user ID
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        status: 'fail',
        message: 'User ID is missing in the request'
      });
    }

    const userID = req.user._id;
    console.log('User ID:', userID);

    // Check if image paths are available
    if (!req.files || !req.files.imageOne || !req.files.imageTwo) {
      return res.status(400).json({
        status: 'fail',
        message: 'Both imageOne and imageTwo are required in the request'
      });
    }

    const imageOneLocalPath = req.files.imageOne[0]?.path;
    const imageTwoLocalPath = req.files.imageTwo[0]?.path;

    // Upload images to Cloudinary
    const imageOne = await uploadOnCloudinary(imageOneLocalPath);
    const imageTwo = await uploadOnCloudinary(imageTwoLocalPath);

    console.log('Image One URL:', imageOne.url);
    console.log('Image Two URL:', imageTwo.url);

    // Create new issue
    const issue = await Issue.create({
      title,
      description,
      street,
      city,
      user_id: userID,
      imageOne: imageOne.url,
      imageTwo: imageTwo.url,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

  
    // Respond with success message
    res.status(201).json({
      status: 'success',
      data: {
        issue
      }
    });
  } catch (err) {
    // Log and respond with error message
    console.error('Error:', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!'
    });
  }
};
