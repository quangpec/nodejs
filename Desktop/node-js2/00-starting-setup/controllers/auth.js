const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('625c31156c79456b20d3ede4')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password= req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email}).then(user =>{
    if(user){
      return res.redirect('/login');
    }
    return bcrypt.hash(password,12)
    .then(hashPassword=>{
      user = new User({
        email : email,
        password: hashPassword,
        cart : {
          items:[]
        }
      })
      return user.save();
    })
  }).then(result =>{
    return res.redirect('/login');
  }) 
  .catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
