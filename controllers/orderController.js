const db = require('../models');

// place new order
const placeOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // input validation
    if (!userId || !products || !products.length) {
      return res.status(400).json({ message: 'User ID and products are required' });
    }

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
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

// view specific order by ID
const viewOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id, { include: [db.OrderItem] });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

module.exports = { placeOrder, viewOrder };
