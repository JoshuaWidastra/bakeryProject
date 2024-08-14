const express = require('express');
const router = express.Router();

// controller function. for later
const { placeOrder, viewOrder } = require('../controllers/orderController');

// route untk place new order
router.post('/place', placeOrder);

// route untk view a specific order by ID
router.get('/:id', viewOrder);

module.exports = router;
