import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    end_date: Date,
    points: Number,
    start_date: Date,
  },
  { collection: "assignments" }
);
export default assignmentSchema;