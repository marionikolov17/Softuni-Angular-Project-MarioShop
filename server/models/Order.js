const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;