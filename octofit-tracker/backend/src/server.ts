import express from 'express';
import './config/database';
import { apiBaseUrl } from './config/apiUrl';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api', (_req, res) => {
  res.status(200).json({
    baseUrl: apiBaseUrl,
    routes: {
      users: `${apiBaseUrl}/api/users/`,
      teams: `${apiBaseUrl}/api/teams/`,
      activities: `${apiBaseUrl}/api/activities/`,
      leaderboard: `${apiBaseUrl}/api/leaderboard/`,
      workouts: `${apiBaseUrl}/api/workouts/`,
    },
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
