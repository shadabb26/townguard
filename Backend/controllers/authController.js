const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Issue = require('./../models/issueModel');
const Contact = require('./../models/contactModel');
const sendEmail = require('./../utils/email');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      contact: req.body.contact,
      password: req.body.password,
      passwordConfirm: req.body.password,
      email: req.body.email
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
    const text = `Dear, ${newUser.name}\nWe are excited to announce that your account has been successfully created on TownGuard! 🎉\n\nYour commitment to improving our community is commendable, and we're thrilled to have you on board.\n\nWith your help, we can work towards resolving local issues efficiently and making our neighborhood a better place for everyone.\n\nThank you for joining us in our mission to foster a cleaner, safer, and more vibrant community. Together, we can make a real difference!\n\nWarm regards,\n\nTownGuaurd`;

    Options = {
      to: newUser.email,
      subject: 'Welcome to TownGuard - Your Account Is Ready!',
      text
    };
    await sendEmail(Options);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong'
    });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  // 1) Check if email and password exits

  if (!email || !password)
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password !'
    });

  // 2) Check if email and password is correct
  const user = await User.findOne({ email, role }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password'
    });

  // 3) if Everything is good send token to client
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and checking if it's there
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.json({
        status: 'fail',
        message: 'Please login!'
      });
    }

    // 2) Verification of Token
    let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.json({
        status: 'fail',
        message: 'Inavlid Token'
      });
    }

    // 3) Check User still exists

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.json({
        status: 'fail',
        message: "User belonging to this token don't exists"
      });
    }

    // 4) Check if user has change password after token issued
    if (currentUser.passwordChangedAfter(decoded.iat)) {
      res.status(401).json({
        status: 'fail',
        message: 'User Recently changed password, Login Again'
      });
    }

    // 5) Access to protected Route
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Something Went wrong !'
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email } = req.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword
      }
    );

    res.status(200).json({
      status: 'Success',
      message: 'Password Changed !'
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: 'Something went Wrong!'
    });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const id = req.user._id;
    const userDetails = await User.findById({ _id: id });
    const userIssueRejected = await Issue.countDocuments({
      user_id: id,
      status: 'rejected'
    });
    const userIssueResolved = await Issue.countDocuments({
      user_id: id,
      status: 'resolved'
    });
    const userIssuePending = await Issue.countDocuments({
      user_id: id,
      status: 'pending'
    });
    res.status(200).json({
      status: 'success',
      data: {
        userDetails,
        stats: { userIssuePending, userIssueResolved, userIssueRejected }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong!'
    });
  }
};

exports.submitContact = async (req, res) => {
  try {
    await Contact.create(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Info saved '
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Something went Wrong !'
    });
  }
};

exports.getContactDetails = async (req, res) => {
  try {
    const contactDetails = await Contact.find();
    res.status(200).json({
      status: 'success',
      data: {
        contactDetails
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Something went wrong !'
    });
  }
};
