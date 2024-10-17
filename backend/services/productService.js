import Product from "../models/productModel.js";

export const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
}

export const getAllProducts = async () => {
    return await Product.find();
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const updateProduct = async (id, productData) => {
    try {
        return await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        return await Product.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};