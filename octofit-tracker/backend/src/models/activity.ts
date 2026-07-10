import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    caloriesBurned: Number,
    userEmail: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
