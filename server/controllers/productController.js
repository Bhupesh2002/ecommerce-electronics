const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      countInStock,
      image,
    } = req.body;

    // Basic validation
    if (!name || !price || !category || !countInStock || !image) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const product = new Product({
      name,
      description,
      brand,
      category,
      price,
      countInStock,
      image,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      countInStock,
      image,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only if provided
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.countInStock = countInStock ?? product.countInStock;
    product.image = image ?? product.image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

