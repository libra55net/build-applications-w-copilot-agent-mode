import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const items = await Activity.find()
    .sort({ performedAt: -1 })
    .populate('user', 'name teamName')
    .lean();

  res.status(200).json({
    resource: 'activities',
    count: items.length,
    items,
  });
});

export default activitiesRouter;
