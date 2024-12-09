import quizModel from "./model.js";

export const findQuizzesForCourse = (courseId) => {
  return quizModel.find({ course: courseId });
};

export const createQuiz = (quiz) => {
  return quizModel.create(quiz);
};

export const findQuizById = (quizId) => {
  return quizModel.findById(quizId);
};

export const updateQuiz = (quizId, quizUpdates) => {
  return quizModel.findByIdAndUpdate(quizId, { $set: quizUpdates }, { new: true });
};

export const deleteQuiz = (quizId) => {
  return quizModel.deleteOne({ _id: quizId });
};

export const togglePublishQuiz = async (quizId) => {
  const quiz = await quizModel.findById(quizId);
  if (!quiz) {
    return null;
  }
  quiz.isPublished = !quiz.isPublished;
  quiz.publishedAt = quiz.isPublished ? new Date() : undefined;
  return quiz.save();
};
