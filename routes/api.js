//Api routes
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const zoneController = require('../controllers/zoneController');
const loginController = require('../controllers/loginController');
const reserverController = require('../controllers/reserverController');
const sendEmailController = require('../controllers/sendEmailController');
const authMiddleware = require('../Middleware/authMiddleware');

//correo
router.post('/envio', sendEmailController.envioCorreo);

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
router.get('/list-account',authMiddleware, accountController.listAccount);
router.get('/account', authMiddleware,accountController.getAccount);
router.put('/edit-account/:id',authMiddleware,accountController.updateAccount);
router.delete('/delete-account/:id', authMiddleware,accountController.deleteAccount);


// api/zone
router.post('/store-zone',authMiddleware ,zoneController.createZone);
router.get('/list-zone', authMiddleware, zoneController.listZone);
router.get('/zone/:id', authMiddleware,zoneController.getZone);
router.put('/edit-zone/:id',authMiddleware, zoneController.updateZone);
router.delete('/delete-zone/:id', authMiddleware,zoneController.deleteZone);

// api/reserver
router.post('/store-reserver',authMiddleware, reserverController.createReserver);
router.get('/reserver/:id',authMiddleware, reserverController.getReserver);
router.get('/list-reserver',authMiddleware, reserverController.listReserver);
router.get('/reserver/:id',authMiddleware, reserverController.getReserver);
router.put('/edit-reserver/:id',authMiddleware,reserverController.updateReserver);
router.put('/edit-statesReserver/:id',authMiddleware,reserverController.updateState);
router.delete('/delete-reserver/:id',authMiddleware, reserverController.deleteReserver);

//api/login
router.post('/login', loginController.loginUser);

module.exports = router;