import { Router } from 'express';
import { getApiBaseUrl } from './config/api';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

const router = Router();

async function buildResourceResponse(resource: string, model: any) {
  const items = await model.find({}).lean();

  return {
    resource,
    count: items.length,
    items,
    apiBaseUrl: getApiBaseUrl(),
  };
}

router.get('/api/users/', async (_req, res) => {
  res.json(await buildResourceResponse('users', User));
});

router.get('/api/teams/', async (_req, res) => {
  res.json(await buildResourceResponse('teams', Team));
});

router.get('/api/activities/', async (_req, res) => {
  res.json(await buildResourceResponse('activities', Activity));
});

router.get('/api/leaderboard/', async (_req, res) => {
  res.json(await buildResourceResponse('leaderboard', Leaderboard));
});

router.get('/api/workouts/', async (_req, res) => {
  res.json(await buildResourceResponse('workouts', Workout));
});

export default router;
