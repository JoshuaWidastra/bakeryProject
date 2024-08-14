const express = require('express');
const router = express.Router();

// controller function. for later
const { listProducts, createProduct, viewProduct } = require('../controllers/productController');

// route ke list all product
router.get('/', listProducts);

// route create new product
router.post('/create', createProduct);

// route ke specific productId
router.get('/:id', viewProduct);

module.exports = router;
