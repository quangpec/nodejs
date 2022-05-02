const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup',[
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((val, {req})=>{
          if(val === 'abc@123.com'){
              throw new Error('Email không hợp lệ')
          }
          else 
            return true

      }), 
      body('password', 'mật khẩu ít nhất 5 kí tự, gồm chữ và số')
      .isLength({min: 5})
      .isAlphanumeric()
    ],
    authController.postSignup
  );
  

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
