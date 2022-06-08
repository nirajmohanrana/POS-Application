const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");
const { deleteMany, insertMany } = require("./models/itemModel");
require("colors");

// config
dotenv.config();
connectDb();

// Function Seeder
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log(`All item added`.bgGreen);
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
