const express = require("express");
const router = express.Router();
const { addToCart, viewCart, removeFromCart } = require("../controllers/cartController");

// view item
router.get("/", viewCart);

// add item
router.post("/add", addToCart);

// remove item 
router.post("/remove", removeFromCart);

module.exports = router;
