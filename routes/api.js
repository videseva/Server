//Api routes
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const zoneController = require('../controllers/zoneController');
// api/category
router.post('/store-category', categoryController.createCategory);
router.get('/list-categories', categoryController.listCategory);
router.get('/category/:id', categoryController.listCategory);
router.put('/edit-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

// api/user
router.post('/store-user', userController.createUser);
router.get('/list-user', userController.listUser);
router.get('/user/:id', userController.getUser);
router.put('/edit-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

// api/account
router.post('/store-account', accountController.createAccount);
router.get('/list-account', accountController.listAccount);
router.get('/account/:id', accountController.getAccount);
router.put('/edit-account/:id', accountController.updateAccount);
router.delete('/delete-account/:id', accountController.deleteAccount);


// api/zone
router.post('/store-zone', zoneController.createZone);
router.get('/list-zone', zoneController.listZone);
router.get('/zone/:id', zoneController.getZone);
router.put('/edit-zone/:id', zoneController.updateZone);
router.delete('/delete-zone/:id', zoneController.deleteZone);
module.exports = router;