const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.post('/admin', adminController.createAdmin);
router.get('/admin/:id', adminController.getAdminById);

module.exports = router;