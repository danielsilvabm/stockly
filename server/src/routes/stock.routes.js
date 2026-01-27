const express = require('express');
const stockController = require('../controllers/stock.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

// Entry: Admin and Warehouse
router.post('/entry', authMiddleware.restrictTo('admin', 'warehouse'), stockController.entry);

// Exit: Admin, Warehouse, and potentially Requester (if approved - but for now lets strict to admin/warehouse for direct exit or just admin/warehouse)
// Requirement says "Requester" is a role. Usually Requesters *request* items, they don't take them out directly.
// For this MVP step, I will allow Admin/Warehouse to process Exits. 
router.post('/exit', authMiddleware.restrictTo('admin', 'warehouse'), stockController.exit);

router.get('/movements', authMiddleware.restrictTo('admin', 'warehouse'), stockController.getMovements);

module.exports = router;
