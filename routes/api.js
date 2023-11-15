//Api routes
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
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
module.exports = router;