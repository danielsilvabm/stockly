const express = require('express');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const stockRoutes = require('./stock.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/stock', stockRoutes);

module.exports = router;
