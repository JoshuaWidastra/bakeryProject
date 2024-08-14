const db = require('../models');

// place new order
const placeOrder = async (req, res) => {
  const { userId, products } = req.body;
  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const newOrder = await db.Order.create({ userId, totalAmount });

  const orderItems = products.map(product => ({
    orderId: newOrder.id,
    productId: product.id,
    quantity: product.quantity,
    price: product.price
  }));
  await db.OrderItem.bulkCreate(orderItems);

  res.json(newOrder);
};

// view specific order by ID
const viewOrder = async (req, res) => {
  const { id } = req.params;
  const order = await db.Order.findByPk(id, { include: [db.OrderItem] });
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

module.exports = { placeOrder, viewOrder };
