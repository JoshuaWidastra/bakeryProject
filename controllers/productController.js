const db = require("../models");

// list products
const listProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.render("Product-List", { products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// create new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, userId } = req.body;

    // input validation
    if (!name || !description || !price || !categoryId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = await db.Product.create({
      name,
      description,
      price,
      categoryId,
      userId,
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// view specific product by ID
const viewProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id, { include: [db.Category] });
    if (product) {
      res.render("Product-Detail", { product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

module.exports = { listProducts, createProduct, viewProduct };
