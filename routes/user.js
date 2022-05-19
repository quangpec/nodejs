const path = require('path');
const { check, body } = require('express-validator');
const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/',isAuth.isLoggedIn, userController.getIndex);
router.get('/covid',isAuth.isLoggedIn,userController.getCovid);
router.get('/checkin',isAuth.isLoggedIn,userController.getCheckin);
router.get('/nghiphep',isAuth.isLoggedIn,userController.getNghiphep);
router.get('/date-detail',isAuth.isLoggedIn,userController.getDate);
router.get('/month',isAuth.isLoggedIn,userController.getMonth);

router.post('/avt',isAuth.isLoggedIn,userController.postUser);
router.post('/kbtn',isAuth.isLoggedIn,userController.postThannhiet);
router.post('/duongtinh',isAuth.isLoggedIn,userController.postDuongtinh);
router.post('/muitiem',isAuth.isLoggedIn,userController.postMuitiem);
router.post('/checkin',isAuth.isLoggedIn,userController.PostCheckin);
router.post('/dangki-nghiphep',isAuth.isLoggedIn,userController.PostNghiphep)
router.post('/date-detail',isAuth.isLoggedIn,userController.postDate);
router.post('/month',isAuth.isLoggedIn,userController.postMonth);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//  router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

module.exports = router;
