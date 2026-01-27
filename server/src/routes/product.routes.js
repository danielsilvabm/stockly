const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Only Admin or Warehouse staff can create products
router.post('/', authMiddleware.restrictTo('admin', 'warehouse'), productController.createProduct);

module.exports = router;
