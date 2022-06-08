const express = require("express");
const { addBillsController, getBillsController, } = require("../controllers/billsController");

const router = express.Router();

// Routes

// Method - post
router.post("/add-bills", addBillsController);

// Method - get
router.get("/get-bills", getBillsController);


module.exports = router;
