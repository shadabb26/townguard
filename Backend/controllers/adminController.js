const User = require('./../models/userModel');
const Issues = require('./../models/issueModel');
const Contact = require('./../models/contactModel');
const sendMail = require('./../utils/email');

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

exports.getAdmins = async (req, res) => {
  const admins = await User.find({ role: 'admin' });
  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: {
      admins
    }
  });
};

exports.getResolvers = async (req, res) => {
  try {
    const resolvers = await User.find({ role: 'resolver' });
    res.status(200).json({
      status: 'success',
      results: resolvers.length,
      data: {
        resolvers
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong !'
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const newAdmin = await User.create({
      name: req.body.name,
      contact: req.body.contact,
      password: req.body.password,
      passwordConfirm: req.body.password,
      email: req.body.email,
      role: req.body.role
    });
    res.status(201).json({
      status: 'success',
      data: {
        user: newAdmin
      }
    });
    console.log(newAdmin.email);
    const text = 'admin ready';
    const Options = {
      to: req.body.email,
      subject: 'Welcome to TownGuard - Your Admin Account Is Ready!',
      text
    };

    await sendMail(Options);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong'
    });
  }
};

exports.getStats = async (_, res) => {
  try {
    const usersPromise = User.countDocuments({ role: 'user' });
    const adminsPromise = User.countDocuments({ role: 'admin' });
    const resolversPromise = User.countDocuments({ role: 'resolver' });
    const issuesPromise = Issues.countDocuments();
    const contactPromise = Contact.countDocuments();
    const pendingPromise = Issues.countDocuments({ status: 'pending' });
    const resolvedPromise = Issues.countDocuments({ status: 'resolved' });
    const rejectedPromise = Issues.countDocuments({ status: 'rejected' });

    const [
      users,
      adminsCount,
      resolversCount,
      issuesCount,
      contactCount,
      pendingCount,
      resolvedCount,
      rejectedCount
    ] = await Promise.all([
      usersPromise,
      adminsPromise,
      resolversPromise,
      issuesPromise,
      contactPromise,
      pendingPromise,
      resolvedPromise,
      rejectedPromise
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        users,
        admins: adminsCount,
        resolvers: resolversCount,
        issues: issuesCount,
        pending: pendingCount,
        resolved: resolvedCount,
        rejected: rejectedCount,
        contacts: contactCount
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

exports.adminDetails = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await User.findById(adminId);
    res.status(200).json({
      status: 'success',
      admin
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong!'
    });
  }
};

exports.getContactDetails = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 'success',
      data: {
        contacts
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong!'
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.body.id;
  console.log(id);
};
