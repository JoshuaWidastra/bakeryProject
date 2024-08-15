const db = require("../models");

// add item to cart
const addToCart = async (req, res) => {
  const productId = req.body.productId; 
  const quantity = req.body.quantity || 1;

  if (req.session.userId) {
    const userId = req.session.userId;
    await db.CartItem.upsert({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
  } else {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({ productId, quantity });
  }

  res.redirect('/cart');
};

// vview cart items
const viewCart = async (req, res) => {
  let cartItems = [];
  if (req.session.userId) {
    cartItems = await db.CartItem.findAll({
      where: { userId: req.session.userId },
      include: [db.Product],
    });
  } else if (req.session.cart) {
    cartItems = await Promise.all(req.session.cart.map(async (item) => {
      const product = await db.Product.findByPk(item.productId);
      return { ...item, product };
    }));
  }
  
  res.render('Cart', { cartItems });
};

// remove item from cart
const removeFromCart = async (req, res) => {
  const productId = req.body.productId;

  if (req.session.userId) {
    const userId = req.session.userId;
    await db.CartItem.destroy({
      where: {
        userId: userId,
        productId: productId,
      }
    });
  } else {
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  }

  res.redirect('/cart');
};

module.exports = { addToCart, viewCart, removeFromCart };
