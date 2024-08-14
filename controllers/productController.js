const db = require('../models');

// list products
const listProducts = async (req, res) => {
  const products = await db.Product.findAll();
  res.json(products);
};

// create new product
const createProduct = async (req, res) => {
  const { name, description, price, categoryId, userId } = req.body;
  const newProduct = await db.Product.create({ name, description, price, categoryId, userId });
  res.json(newProduct);
};

// view specific product by ID
const viewProduct = async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { listProducts, createProduct, viewProduct };
