const { Op } = require('sequelize');

async function getMostPopularItem() {
  const { Product, OrderItem } = require('../models'); // Dynamically import models
  
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const endOfWeek = new Date();
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const popularItem = await OrderItem.findAll({
    attributes: ['productId', [sequelize.fn('COUNT', sequelize.col('productId')), 'count']],
    where: {
      createdAt: {
        [Op.between]: [startOfWeek, endOfWeek]
      }
    },
    group: ['productId'],
    order: [[sequelize.literal('count'), 'DESC']],
    limit: 1
  });

  if (popularItem.length > 0) {
    const product = await Product.findByPk(popularItem[0].productId);
    return product;
  } else {
    return null;
  }
}

module.exports = { getMostPopularItem };
