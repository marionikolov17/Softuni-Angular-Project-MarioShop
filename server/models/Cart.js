const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;