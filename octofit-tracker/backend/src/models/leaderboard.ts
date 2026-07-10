import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    rank: Number,
    streakDays: Number,
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
