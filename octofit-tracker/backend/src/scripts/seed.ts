import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.local',
        age: 29,
        heightCm: 168,
        weightKg: 62,
        teamName: 'North Striders',
        goals: ['Run 10K under 50 minutes', 'Improve VO2 max'],
      },
      {
        name: 'Luca Moretti',
        email: 'luca.moretti@octofit.local',
        age: 34,
        heightCm: 181,
        weightKg: 78,
        teamName: 'Metro Lifters',
        goals: ['Bench press 110kg', 'Maintain 12% body fat'],
      },
      {
        name: 'Aisha Rahman',
        email: 'aisha.rahman@octofit.local',
        age: 26,
        heightCm: 164,
        weightKg: 56,
        teamName: 'North Striders',
        goals: ['Complete first sprint triathlon', 'Swim 2km nonstop'],
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.local',
        age: 31,
        heightCm: 176,
        weightKg: 71,
        teamName: 'Metro Lifters',
        goals: ['Deadlift 180kg', 'Improve mobility'],
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'North Striders',
        city: 'Seattle',
        motto: 'Consistency over intensity',
        points: 2430,
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Metro Lifters',
        city: 'Austin',
        motto: 'Strong every season',
        points: 2515,
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'tempo run',
        durationMinutes: 47,
        caloriesBurned: 510,
        performedAt: new Date('2026-07-22T06:15:00Z'),
      },
      {
        user: users[1]._id,
        type: 'upper body strength',
        durationMinutes: 58,
        caloriesBurned: 460,
        performedAt: new Date('2026-07-22T18:20:00Z'),
      },
      {
        user: users[2]._id,
        type: 'swim intervals',
        durationMinutes: 52,
        caloriesBurned: 430,
        performedAt: new Date('2026-07-23T07:40:00Z'),
      },
      {
        user: users[3]._id,
        type: 'deadlift + accessory',
        durationMinutes: 63,
        caloriesBurned: 540,
        performedAt: new Date('2026-07-24T17:10:00Z'),
      },
      {
        user: users[0]._id,
        type: 'recovery cycling',
        durationMinutes: 35,
        caloriesBurned: 290,
        performedAt: new Date('2026-07-25T12:05:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Runner Core Stability',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetMuscleGroups: ['core', 'glutes'],
        equipment: ['mat', 'mini band'],
        createdBy: 'Coach Elena',
      },
      {
        title: 'Strength Foundation A',
        difficulty: 'intermediate',
        durationMinutes: 45,
        targetMuscleGroups: ['chest', 'back', 'legs'],
        equipment: ['barbell', 'bench'],
        createdBy: 'Coach Rivera',
      },
      {
        title: 'Explosive Power Circuit',
        difficulty: 'advanced',
        durationMinutes: 38,
        targetMuscleGroups: ['full body'],
        equipment: ['kettlebell', 'box'],
        createdBy: 'Coach Elena',
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: '2026-W30',
        entries: [
          { user: users[3]._id, score: 980, rank: 1 },
          { user: users[1]._id, score: 940, rank: 2 },
          { user: users[0]._id, score: 915, rank: 3 },
          { user: users[2]._id, score: 890, rank: 4 },
        ],
      },
    ]);

    console.log(`Seeded users: ${users.length}`);
    console.log(`Seeded teams: ${teams.length}`);
    console.log('Seeded activities, leaderboard, and workouts successfully');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
