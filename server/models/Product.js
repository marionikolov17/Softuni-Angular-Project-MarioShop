const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["computers", "laptops"]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;