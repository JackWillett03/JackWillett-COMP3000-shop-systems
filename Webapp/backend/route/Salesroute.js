const express = require('express');
const router = express.Router();
const salesController = require('../controllers/Salescontroller');

router.get('/', salesController.getSales); // Get all sales data
router.get('/stock/:stockId', salesController.getSalesByStockId); // Get by stockId
router.post('/', salesController.addSales); // Add new sales data
router.put('/:id', salesController.updateSales); // Updates sales by Id
router.delete('/:id', salesController.deleteSales); // Delete sales by Id

module.exports = router;
