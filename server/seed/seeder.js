const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" }); 

const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("./products");




// connect to DB
connectDB();

// import data
const importData = async () => {
  try {
    await Product.deleteMany(); // clear old data

    await Product.insertMany(products);

    console.log("Products Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// delete data
const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Products Deleted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// command control
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}