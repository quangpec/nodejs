const express = require('express');
const { check, body } = require('express-validator/check');
const User = require('../models/user');

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
        return User.findOne({ email: val })
        .then(user => {
          if (user) {
            return Promise.reject('Email đã sử dụng')
          }
      })
    }), 
      body('password', 'mật khẩu ít nhất 5 kí tự, gồm chữ và số')
      .isLength({min: 5})
      .isAlphanumeric(),
      body('confirmPassword')
      .custom((val,{req})=>{
        if(val !== req.body.password){
            throw new Error('Mật khuẩ không trùng khớp')
        }
        else{
            return true
        }
      })
    ],
    authController.postSignup
  );
  

router.post('/logout', authController.postLogout);

// router.get('/reset', authController.getReset);

// router.post('/reset', authController.postReset);

// router.get('/reset/:token', authController.getNewPassword);

// router.post('/new-password', authController.postNewPassword);

module.exports = router;
