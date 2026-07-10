import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        name: 'Alice Chen',
        email: 'alice@example.com',
        age: 29,
        fitnessGoal: 'Marathon training',
        level: 'advanced',
      },
      {
        name: 'Bruno Silva',
        email: 'bruno@example.com',
        age: 34,
        fitnessGoal: 'Strength gain',
        level: 'intermediate',
      },
      {
        name: 'Chloe Martin',
        email: 'chloe@example.com',
        age: 27,
        fitnessGoal: 'Weight loss',
        level: 'beginner',
      },
    ]);

    await Team.create([
      {
        name: 'North Stars',
        captain: users[0].name,
        members: users.map((user) => user.name),
        goal: 'Complete 100km this month',
      },
    ]);

    await Activity.create([
      {
        type: 'Run',
        durationMinutes: 45,
        distanceKm: 8.4,
        caloriesBurned: 430,
        userEmail: users[0].email,
      },
      {
        type: 'Cycling',
        durationMinutes: 60,
        distanceKm: 24,
        caloriesBurned: 520,
        userEmail: users[1].email,
      },
      {
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        userEmail: users[2].email,
      },
    ]);

    await Leaderboard.create([
      { userEmail: users[0].email, points: 980, rank: 1, streakDays: 12 },
      { userEmail: users[1].email, points: 845, rank: 2, streakDays: 8 },
      { userEmail: users[2].email, points: 710, rank: 3, streakDays: 5 },
    ]);

    await Workout.create([
      { name: 'HIIT Sprint Circuit', category: 'Cardio', durationMinutes: 25, difficulty: 'hard', targetMuscleGroup: 'Full body' },
      { name: 'Upper Body Strength', category: 'Strength', durationMinutes: 40, difficulty: 'medium', targetMuscleGroup: 'Chest, back, shoulders' },
      { name: 'Mobility Flow', category: 'Recovery', durationMinutes: 20, difficulty: 'easy', targetMuscleGroup: 'Core, flexibility' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
