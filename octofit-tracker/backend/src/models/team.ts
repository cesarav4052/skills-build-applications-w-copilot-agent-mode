import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    goal: String,
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
