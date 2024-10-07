import express from 'express';
import * as productController from "../controllers/productController.js";
// Import middleware if applicable

const router = express.Router();

router.post('/',productController.createProduct);     // POST /api/products
router.get('/',productController.getAllProducts);     // GET /api/products
router.post('/:id',productController.getProductById); // GET /api/products/:id
router.put('/:id',productController.updateProduct);   // POST /api/products
router.delete('/:id',productController.deleteProduct);   // POST /api/products

export default router;
