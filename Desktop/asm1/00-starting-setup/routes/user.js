const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getIndex);
router.get('/covid',userController.getCovid);
router.get('/checkin',userController.getCheckin);

router.post('/avt',userController.postUser);
router.post('/kbtn',userController.postThannhiet);
router.post('/duongtinh',userController.postDuongtinh);
router.post('/muitiem',userController.postMuitiem);
router.post('/checkin',userController.PostCheckin);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//  router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

module.exports = router;
