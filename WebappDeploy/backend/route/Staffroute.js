const express = require('express');
const router = express.Router();
const staffController = require('../controllers/Staffcontroller');
const Allowstaff = require('../middleware/Staffauthorisation');

router.get('/', Allowstaff({ allowOwner: true}), staffController.getStaff); // Get all staff
router.get('/shop/:shopId', Allowstaff({ allowOwner: true, allowManager: true}), staffController.getStaffByShopId); // Get staff by Shopid
router.get('/isManager/:isManager', Allowstaff({ allowOwner: true}), staffController.getStaffByIsManager); // Get staff based on if they're a manager
router.get('/:id', staffController.getStaffById); // Get staff by Id
router.post('/', Allowstaff({ allowOwner: true, allowManager: true}), staffController.addStaff); // Add new staff
router.post('/login', staffController.login); // Login
router.put('/:id', Allowstaff({ allowOwner: true, allowManager: true, allowStaff: true}), staffController.updateStaff); // Update by Id
router.delete('/:id', Allowstaff({ allowOwner: true, allowManager: true}), staffController.deleteStaff); // Delete staff by Id

module.exports = router;
