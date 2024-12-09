import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
  questionType: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
    required: true,
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  points: { type: Number, default: 1 },

  choices: [
    {
      text: String,
      correct: Boolean
    }
  ],

  answers: [String],

  correctAnswer: { type: Boolean }
}, { collection: "questions", timestamps: true });

export default questionSchema;
