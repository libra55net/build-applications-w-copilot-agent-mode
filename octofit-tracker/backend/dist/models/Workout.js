"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 5 },
    targetMuscleGroups: { type: [String], required: true },
    equipment: { type: [String], default: [] },
    createdBy: { type: String, required: true, trim: true }
}, { timestamps: true });
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
