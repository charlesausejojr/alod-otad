
import * as productServices from "../services/productServices.js";

//=========================
// POST 
//=========================
export const createProduct = async (req, res) => {
    try {
        const {name, price, image} = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({
                message: 'Please provide all required fields: name, price, and image.'
            });
        }

        const newProduct = await productServices.createProduct(req.body);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

//=========================
// GET 
//=========================
export const getAllProducts = async (req, res) => {
    try {
        const products = await productServices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productServices.getProductById(req.params.id);
        if (!product) { // if id not exists 
            return res.status(404).json({ message : "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

//=========================
// PUT 
//=========================
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productServices.updateProduct(req.params.id, req.body);
        if (!updatedProduct) { // if not a successful update (not found)
            return res.status(404).json({ message : "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

//=========================
// DELETE 
//=========================
export const deleteProduct = async (id) => {
    try {
        const deletedProduct = await productServices.deleteProduct(req.params.id);
        if(!deletedProduct) { // if not succesful update (not found)
            return res.status(404).json({ message : "Product not found" });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}
