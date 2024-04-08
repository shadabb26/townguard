const User = require('./../models/userModel');
const Issues = require('./../models/issueModel');
const uploadOnCloudinary = require('./../utils/cloudinary');
const sendMail = require('./../utils/email');
const Issue = require('./../models/issueModel');

exports.getStats = async (_, res) => {
  try {
    const issuesPromise = Issues.countDocuments();
    const pendingPromise = Issues.countDocuments({ status: 'pending' });
    const resolvedPromise = Issues.countDocuments({ status: 'resolved' });
    const rejectedPromise = Issues.countDocuments({ status: 'rejected' });

    const [
      issuesCount,
      pendingCount,
      resolvedCount,
      rejectedCount
    ] = await Promise.all([
      issuesPromise,
      pendingPromise,
      resolvedPromise,
      rejectedPromise
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        issues: issuesCount,
        pending: pendingCount,
        resolved: resolvedCount,
        rejected: rejectedCount
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

exports.resolverDetails = async (req, res) => {
  try {
    const resolverId = req.user._id;
    const resolver = await User.findById(resolverId);

    const resolvedCount = await Issue.countDocuments({
      resolver_id: resolverId,
      status: 'resolved'
    });
    const rejectedCount = await Issue.countDocuments({
      resolver_id: resolverId,
      status: 'rejected'
    });

    res.status(200).json({
      status: 'success',
      resolver,
      count: { rejectedCount, resolvedCount }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong!'
    });
  }
};

exports.rejectIssue = async (req, res) => {
  try {
    const resolverId = req.user._id;
    const issueId = req.body.id;
    const rejectReason = req.body.reason.reason;
    const issue = await Issues.findByIdAndUpdate(issueId, {
      resolver_id: resolverId,
      rejectionReason: rejectReason,
      status: 'rejected',
      closedDate: Date.now()
    });

    if (!issue) {
      return res.status(404).json({
        status: 'fail',
        message: 'Issue not found'
      });
    }
    sendMail()
    res.status(200).json({
      status: 'success',
      data: {
        issue
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

exports.resolveIssue = async (req, res) => {
  try {
    const resolverId = req.user._id;
    const issueId = req.body.id;
    console.log(req.files.resolveImg);
    if (!req.files || !req.files.resolveImg) {
      return res.status(400).json({
        status: 'fail',
        message: 'Image is required !'
      });
    }

    const resolveImgLocalPath = req.files.resolveImg[0]?.path;

    // Upload on Cloudinary
    const resolveImg = await uploadOnCloudinary(resolveImgLocalPath);
    console.log(resolveImg.url);
    const issue = await Issues.findByIdAndUpdate(issueId, {
      resolver_id: resolverId,
      resolveImg: resolveImg.url,
      status: 'resolved',
      closedDate: Date.now()
    });

    if (!issue) {
      return res.status(404).json({
        status: 'fail',
        message: 'Issue not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        issue
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
