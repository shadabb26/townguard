const express = require('express');
const issueController = require('./../controllers/issueController');
const authController = require('./../controllers/authController');
const { upload } = require('./../middlewares/multer');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, issueController.getIssues)
  .post(
    authController.protect,
    upload.fields([
      { name: 'imageOne', maxCount: 1 },
      { name: 'imageTwo', maxCount: 1 }
    ]),
    issueController.postIssues
  );

router
  .route('/getIssueByUser')
  .get(authController.protect, issueController.getIssueByUserId);

router.route('/getById').get(authController.protect, issueController.getIssueById)
module.exports = router;
