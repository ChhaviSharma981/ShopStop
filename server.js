const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Store = require("./models/storeModel");
const Order = require("./models/orderModel");
const OrderItem = require("./models/orderitemModel");
const userReview = require("./models/userReviewModel");
const Cato = require("./models/catoModel");
const Affiliate = require("./models/affiliateModel");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node Server is Working.");
});

// Product Routes
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addproduct", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "can't find the product" });
    }
    const updatedproduct = await Product.findById(id);
    res.status(200).json(updatedproduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "can't find the product" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user Routes
app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const emailValue = req.body.email;
    const passwordValue = req.body.password;
    const user = await User.findOne({
      email: emailValue,
      password: passwordValue,
    });
    if (!user) {
      return res.status(404).json({ message: "can't find the user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "can't find the user" });
    }
    const updateduser = await User.findById(id);
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//review Routes
app.get("/product/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await userReview.find({ productid: id });
    if (!review) {
      return res.status(404).json({ message: "can't find any Reviews" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/review/add", async (req, res) => {
  try {
    const userReviewValue = await userReview.create(req.body);
    res.status(200).json(userReviewValue);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

app.post("/product/order/add", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/product/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/product/order/item/add", async (req, res) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/order/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const orders = await Order.find({ userid: userid });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/product/orderDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findOne({ _id: id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/product/order/item/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const orders = await OrderItem.find({ orderid: orderid });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//store Routes
app.get("/store", async (req, res) => {
  try {
    const stores = await Store.find({});
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/store/add", async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/store/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Store.findByIdAndUpdate(id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/store/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Store.findOne({ owner: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/product/cato", async (req, res) => {
  try {
    const cato = await Cato.create(req.body);
    res.status(200).json(cato);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/cato/all", async (req, res) => {
  try {
    const cato = await Cato.find({});
    res.status(200).json(cato);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Affiliate Links

app.post("/product/affiliate", async (req, res) => {
  try {
    const cato = await Affiliate.create(req.body);
    res.status(200).json(cato);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/affiliate/all", async (req, res) => {
  try {
    const cato = await Affiliate.find({});
    res.status(200).json(cato);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/affiliate/search/:usernameVal", async (req, res) => {
  try {
    const { usernameVal } = req.params;
    const link = await Affiliate.find({ username: usernameVal });
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/affiliate/count/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const product = await Affiliate.findOneAndUpdate(
      { affiliate_code: code },
      { $inc: { count: 1 } }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

mongoose
  .connect(
    "mongodb+srv://mk4693480:KMayank%231905@cluster0.8yhvib4.mongodb.net/ecommerceee"
  )
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
