"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    caloriesBurned: Number,
    userEmail: { type: String, required: true },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
