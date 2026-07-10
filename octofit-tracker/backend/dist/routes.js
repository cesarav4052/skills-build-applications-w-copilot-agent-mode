"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("./config/api");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const router = (0, express_1.Router)();
async function buildResourceResponse(resource, model) {
    const items = await model.find({}).lean();
    return {
        resource,
        count: items.length,
        items,
        apiBaseUrl: (0, api_1.getApiBaseUrl)(),
    };
}
router.get('/api/users/', async (_req, res) => {
    res.json(await buildResourceResponse('users', user_1.User));
});
router.get('/api/teams/', async (_req, res) => {
    res.json(await buildResourceResponse('teams', team_1.Team));
});
router.get('/api/activities/', async (_req, res) => {
    res.json(await buildResourceResponse('activities', activity_1.Activity));
});
router.get('/api/leaderboard/', async (_req, res) => {
    res.json(await buildResourceResponse('leaderboard', leaderboard_1.Leaderboard));
});
router.get('/api/workouts/', async (_req, res) => {
    res.json(await buildResourceResponse('workouts', workout_1.Workout));
});
exports.default = router;
