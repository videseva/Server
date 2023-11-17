//Api routes
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const zoneController = require('../controllers/zoneController');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../Middleware/authMiddleware');

// api/category
router.post('/store-category', authMiddleware, categoryController.createCategory);
router.get('/list-categories', authMiddleware, categoryController.listCategory);
router.get('/category/:id', authMiddleware, categoryController.listCategory);
router.put('/edit-category/:id', authMiddleware, categoryController.updateCategory);
router.delete('/delete-category/:id', authMiddleware, categoryController.deleteCategory);

// api/user
router.post('/store-user',authMiddleware, userController.createUser);
router.get('/list-user', authMiddleware,userController.listUser);
router.get('/user/:id',authMiddleware ,userController.getUser);
router.put('/edit-user/:id', authMiddleware,userController.updateUser);
router.delete('/delete-user/:id', authMiddleware ,userController.deleteUser);

// api/account
router.post('/store-account', accountController.createAccount);
router.get('/list-account', accountController.listAccount);
router.get('/account/:id', accountController.getAccount);
router.put('/edit-account/:id', accountController.updateAccount);
router.delete('/delete-account/:id', accountController.deleteAccount);


// api/zone
router.post('/store-zone', authMiddleware, zoneController.createZone);
router.get('/list-zone', authMiddleware, zoneController.listZone);
router.get('/zone/:id', authMiddleware,zoneController.getZone);
router.put('/edit-zone/:id',authMiddleware, zoneController.updateZone);
router.delete('/delete-zone/:id', authMiddleware,zoneController.deleteZone);


//login

// api/zone

router.post('/login', loginController.loginUser);

module.exports = router;