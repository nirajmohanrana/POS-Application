const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");

// dotenv config
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));

// Port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
