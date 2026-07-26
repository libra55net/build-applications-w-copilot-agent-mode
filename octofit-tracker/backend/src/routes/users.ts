import { Router } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const items = await User.find().sort({ createdAt: -1 }).lean();

  res.status(200).json({
    resource: 'users',
    count: items.length,
    items,
  });
});

export default usersRouter;
