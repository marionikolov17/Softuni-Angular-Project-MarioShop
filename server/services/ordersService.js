const ordersModel = require("./../models/Order");

const getOrders = async () => ordersModel.find();

const getOrder = async (id) => ordersModel.findById(id);

const createOrder = async (data) => ordersModel.create(data);

const updateOrder = async (id, data) => ordersModel.findByIdAndUpdate(id, data, { runValidators: true });

const doneOrder = async (id) => ordersModel.findByIdAndUpdate(id, { isDone: true });

const deleteOrder = async (id) => ordersModel.findByIdAndDelete(id);

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    doneOrder,
    deleteOrder
}