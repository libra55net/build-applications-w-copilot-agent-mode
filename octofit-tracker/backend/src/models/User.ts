import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13, max: 100 },
    heightCm: { type: Number, required: true, min: 100 },
    weightKg: { type: Number, required: true, min: 30 },
    teamName: { type: String, required: true, trim: true },
    goals: { type: [String], default: [] }
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
