import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/products', productRoutes);


// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message : err.message });
});

export default app;

