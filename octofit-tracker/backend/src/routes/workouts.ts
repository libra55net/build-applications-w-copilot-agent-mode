import { Router } from 'express';
import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const items = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();

  res.status(200).json({
    resource: 'workouts',
    count: items.length,
    items,
  });
});

export default workoutsRouter;
