const ordersModel = require("./../models/Order");

const getOrders = async () => ordersModel.find().populate('products.productId').populate('userId');

const getOrder = async (id) => ordersModel.findById(id).populate('products.productId').populate('userId');

const createOrder = async (data) => ordersModel.create(data);

//const updateOrder = async (id, data) => ordersModel.findByIdAndUpdate(id, data, { runValidators: true });

const doneOrder = async (id) => ordersModel.findByIdAndUpdate(id, { isDone: true });

//const deleteOrder = async (id) => ordersModel.findByIdAndDelete(id);

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    doneOrder,
}