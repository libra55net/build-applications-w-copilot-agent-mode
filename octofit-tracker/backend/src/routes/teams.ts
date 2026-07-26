import { Router } from 'express';
import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const items = await Team.find()
    .sort({ points: -1, name: 1 })
    .populate('members', 'name email teamName')
    .lean();

  res.status(200).json({
    resource: 'teams',
    count: items.length,
    items,
  });
});

export default teamsRouter;
