const express = require("express");
const app = express();
const { registerUser, loginUser } = require("./controllers/userController");

// middleware parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine to EJS
app.set("view engine", "ejs");
app.use(express.static("public"));  // static "public" directory

// render homepage
app.get("/", (req, res) => {
  res.render("Homepage"); 
});

// /login and /register routes
app.get("/login", loginUser);
app.post("/login", loginUser);

app.get("/register", registerUser);
app.post("/register", registerUser);

// other routes for later
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/users", require("./routes/users"));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
