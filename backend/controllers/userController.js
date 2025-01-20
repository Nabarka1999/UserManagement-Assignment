import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import Counter from '../models/counterModel.js';

// Get all users
const getUser = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Create User
const createUser = async (req, res) => {
    const { firstName, lastName, email, department } = req.body;

    try {
      let counter = await Counter.findOne({ name: 'userIdCounter' });

      if (!counter) {
        counter = new Counter({ name: 'userIdCounter', count: 1 });
        await counter.save();
      }
      
      const userId = counter.count;

      counter.count += 1;
      await counter.save();

      const newUser = new User({
        userid: userId, 
        firstName,
        lastName,
        email,
        department,
      });

      await newUser.save();
      
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Edit User
const editUser = async (req, res) => {
  const { firstName, lastName, email, department } = req.body;

  try {
    const user = await User.findOne({ userid: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.department = department || user.department;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
      const result = await User.deleteOne({ userid: req.params.id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User removed' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export { createUser, editUser, deleteUser, getUser };
