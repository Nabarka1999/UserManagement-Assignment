import express from 'express';
import { createUser, editUser, deleteUser , getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUser);

// POST - Create User
router.post('/users', createUser);

// PUT - Edit User
router.put('/users/:id', editUser);

// DELETE - Delete User
router.delete('/users/:id', deleteUser);

export default router;
