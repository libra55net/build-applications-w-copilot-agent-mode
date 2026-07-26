"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    const items = await Workout_1.default.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
    res.status(200).json({
        resource: 'workouts',
        count: items.length,
        items,
    });
});
exports.default = workoutsRouter;
