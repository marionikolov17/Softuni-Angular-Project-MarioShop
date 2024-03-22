const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;