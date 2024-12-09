import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, default: "New Quiz" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
  description: { type: String, default: "" },
  quizType: {
    type: String,
    enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
    default: "GRADED_QUIZ",
  },
  assignmentGroup: {
    type: String,
    enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
    default: "QUIZZES",
  },
  points: { type: Number, default: 0 },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  maxAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: Boolean, default: false },
  accessCode: { type: String, default: "" },
  oneQuestionAtTime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
  dueDate: { type: Date },
  availableFrom: { type: Date },
  availableUntil: { type: Date },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  numberOfQuestions: { type: Number, default: 0 },
}, { collection: "quizzes", timestamps: true });

export default quizSchema;
