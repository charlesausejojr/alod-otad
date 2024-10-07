import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
