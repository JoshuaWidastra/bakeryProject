const { where } = require("sequelize");
const db = require("../models");

// add item to cart
const addToCart = async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;
  try {
    await db.Cart.create({ ProductId: id, UserId: userId });
    res.redirect(`/cart`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// view cart items
const viewCart = async (req, res) => {
  try {
    const cartItems = await db.Cart.findAll({
      where: { UserId: req.session.userId },
      include: [db.Product],
    });

    res.render("Cart", { cartItems });
  } catch (err) {
    console.error("Error viewing cart items:", err);
    res.status(500).send("Internal Server Error");
  }
};

// remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.session;
  console.log("Received productId:", productId);
  console.log("Session User ID:", req.session.userId);
  try {
    if (req.session.userId) {
      const userId = req.session.userId;
      await db.Cart.destroy({
        where: {
          UserId: userId,
          ProductId: productId,
        },
      });
    } else {
      req.session.cart = req.session.cart.filter(
        (item) => item.productId !== productId
      );
    }

    res.redirect("/cart");
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addToCart, viewCart, removeFromCart };
