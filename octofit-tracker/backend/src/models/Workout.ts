import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 5 },
    targetMuscleGroups: { type: [String], required: true },
    equipment: { type: [String], default: [] },
    createdBy: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
