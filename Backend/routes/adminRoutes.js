const express = require('express');
const adminController = require('./../controllers/adminController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').post(adminController.signUp);
router.route('/users').get(authController.protect, adminController.getUsers);

router.route('/stats').get(authController.protect, adminController.getStats);
router.route('/admins').get(authController.protect, adminController.getAdmins);

router
  .route('/resolvers')
  .get(authController.protect, adminController.getResolvers);

router
  .route('/details')
  .get(authController.protect, adminController.adminDetails);

router
  .route('/contact-details')
  .get(authController.protect, adminController.getContactDetails);
module.exports = router;
