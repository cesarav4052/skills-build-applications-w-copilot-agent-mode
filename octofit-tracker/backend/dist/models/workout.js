"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: Number,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    targetMuscleGroup: String,
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
