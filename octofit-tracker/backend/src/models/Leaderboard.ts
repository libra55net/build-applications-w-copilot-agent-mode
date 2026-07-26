import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] }
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
