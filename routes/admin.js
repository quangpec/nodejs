const express = require('express');
//const { check, body } = require('express-validator');
const User = require('../models/user');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/manager',isAuth.isLoggedIn,isAuth.isAdmin,adminController.getManager);
router.post('/addNhanvien',isAuth.isLoggedIn,isAuth.isAdmin, adminController.postAdduser);
router.post('/:userId',isAuth.isLoggedIn,isAuth.isAdmin,adminController.postUser);
router.post('/edit-user/:id',isAuth.isLoggedIn,isAuth.isAdmin,adminController.editUser);
router.get('/covid/:id',isAuth.isLoggedIn,isAuth.isAdmin,adminController.covidId);
router.post('/chamCong/delete',isAuth.isLoggedIn,isAuth.isAdmin,adminController.postDelete);
router.post('/chamCong/xacnhan',isAuth.isLoggedIn,isAuth.isAdmin,adminController.postXacnhan);
router.get('/chamCong/:id',isAuth.isLoggedIn,isAuth.isAdmin,adminController.getchamCong);
router.post('/chamCong/:id',isAuth.isLoggedIn,isAuth.isAdmin,adminController.postListdiemdanh);

module.exports = router;