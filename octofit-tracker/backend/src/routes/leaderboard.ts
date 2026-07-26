import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const items = await Leaderboard.find()
    .sort({ createdAt: -1 })
    .populate('entries.user', 'name teamName')
    .lean();

  res.status(200).json({
    resource: 'leaderboard',
    count: items.length,
    items,
  });
});

export default leaderboardRouter;
