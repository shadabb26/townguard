const express = require('express');
const resolverController = require('./../controllers/resolverController');
const authController = require('./../controllers/authController');
const { upload } = require('./../middlewares/multer');

const router = express.Router();
router.route('/stats').get(authController.protect, resolverController.getStats);

router
  .route('/details')
  .get(authController.protect, resolverController.resolverDetails);

router
  .route('/reject')
  .patch(authController.protect, resolverController.rejectIssue);

router
  .route('/resolve')
  .patch(
    authController.protect,
    upload.fields([{ name: 'resolveImg', maxCount: 1 }]),
    resolverController.resolveIssue
  );



module.exports = router;
