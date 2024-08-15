const express = require("express");
const router = express.Router();
const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/cartController");

// view item
router.get("/", viewCart);

// add item
router.get("/add/:id", addToCart);

// remove item
router.get("/remove/:productId", removeFromCart);

module.exports = router;
