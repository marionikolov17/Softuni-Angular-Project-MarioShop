const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;