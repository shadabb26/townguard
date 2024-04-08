const express = require('express');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');
const router = express.Router();

router
  .get('/contact', authController.getContactDetails)
  .post('/contact', authController.submitContact)
  .post('/signup', authController.signUp)
  .post('/login', authController.login);

router
  .route('/changePassword')
  .patch(authController.protect, authController.changePassword);


router
  .route('/user-stats')
  .get(authController.protect, authController.getUserStats);

module.exports = router;
