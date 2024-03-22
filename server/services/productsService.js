const productsModel = require("./../models/Product");

const getProducts = async () => productsModel.find();

const getProduct = async (id) => productsModel.findById(id);

const createProduct = async (data) => productsModel.create(data);

const updateProduct = async (id, data) => productsModel.findByIdAndUpdate(id, data, { runValidators: true });

const deleteProduct = async (id) => productsModel.findByIdAndDelete(id);

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}