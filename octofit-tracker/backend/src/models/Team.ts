import { Schema, model, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
    members: { type: [Schema.Types.ObjectId], ref: 'User', default: [] as Types.ObjectId[] }
  },
  { timestamps: true }
);

const Team = model('Team', teamSchema);

export default Team;
