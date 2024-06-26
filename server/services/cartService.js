const cartModel = require("./../models/Cart");

// const getCarts = async () => cartModel.find();

const getCart = async (id) => cartModel.findOne({ userId: id }).populate("products.productId");

const createCart = async (data) => cartModel.create(data);

const updateCart = async (id, data) => cartModel.findOneAndUpdate({ userId: id }, { products: data }, { runValidators: true });

// const deleteCart = async (id) => cartModel.findByIdAndDelete(id);

module.exports = {
    getCart,
    createCart,
    updateCart
}