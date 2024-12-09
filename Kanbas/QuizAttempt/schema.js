import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    attemptNumber: { type: Number, required: true },
    answers: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    score: { type: Number, default: null },
    submittedAt: { type: Date, default: null }
  },
  { collection: "quizAttempts", timestamps: true }
);

export default attemptSchema;
