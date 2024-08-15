const express = require("express");
const app = express();

// middleware parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine to EJS
app.set("view engine", "ejs");
app.use(express.static("public"));  // static "public" directory

// routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
