import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 5;  
    const offset = (page - 1) * limit; 

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
    });

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalUsers: count,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};



export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, department } = req.body;

    const user = await User.create({firstName, lastName, email, department });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, department } = req.body;
    const userId = req.params.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ firstName, lastName, email, department });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
