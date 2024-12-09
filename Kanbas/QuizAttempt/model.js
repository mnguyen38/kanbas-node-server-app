import mongoose from "mongoose";
import attemptSchema from "./schema.js";

const QuizAttemptModel = mongoose.model("QuizAttemptModel", attemptSchema);
export default QuizAttemptModel;
