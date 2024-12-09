import QuestionModel from "./model.js";

export const findQuestionById = async (quizId, questionId) => {
  return QuestionModel.findOne({ _id: questionId, quizId });
};

export const findQuestionsForQuiz = (quizId) => {
  return QuestionModel.find({ quizId });
};

export const createQuestion = async (quizId, questionData) => {
  const question = { ...questionData, quizId };
  return QuestionModel.create(question);
};

export const updateQuestion = async (quizId, questionId, questionUpdates) => {
  return QuestionModel.findOneAndUpdate(
    { _id: questionId, quizId },
    { $set: questionUpdates },
    { new: true }
  );
};

export const deleteQuestion = async (quizId, questionId) => {
  return QuestionModel.deleteOne({ _id: questionId, quizId });
};
