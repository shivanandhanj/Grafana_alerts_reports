const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
router.get('/', userController.getAllUsers);
router.get('/Id/:userId',userController.getOrdersByUserId);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;