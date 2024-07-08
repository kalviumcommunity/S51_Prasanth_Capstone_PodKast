const express = require('express');
const resetRouter = express.Router();
const authController = require('../routes/forgetpassword');

// Route for forgot password
resetRouter.post('/forgot-password', authController.sendPasswordResetEmail);

// Route for reset password
resetRouter.post('/reset-password', authController.resetPassword);

module.exports = resetRouter;