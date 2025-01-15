const express = require('express');
const router = express.Router();
const staffController = require('../controllers/Staffcontroller');

router.get('/', staffController.getStaff); // Get all staff
router.get('/shop/:shopId', staffController.getStaffByShopId); // Get staff by Shopid
router.get('/isManager/:isManager', staffController.getStaffByIsManager); // Get staff based on if they're a manager
router.post('/', staffController.addStaff); // Add new staff
router.put('/:id', staffController.updateStaff); // Update by Id
router.delete('/:id', staffController.deleteStaff); // Delete staff by Id

module.exports = router;
