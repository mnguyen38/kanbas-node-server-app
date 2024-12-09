import QuizAttemptModel from "./model.js";
import QuestionModel from "../Questions/model.js"; 

export const findLastAttemptForStudentAndQuiz = async (quizId, studentId) => {
  return QuizAttemptModel.findOne({ quizId, studentId })
    .sort({ attemptNumber: -1 })
    .exec();
};

export const countAttemptsForStudentAndQuiz = async (quizId, studentId) => {
  return QuizAttemptModel.countDocuments({ quizId, studentId });
};

export const createAttempt = async (quizId, studentId, attemptNumber) => {
  const attempt = new QuizAttemptModel({ quizId, studentId, attemptNumber });
  return attempt.save();
};

export const findAttemptById = (attemptId) => {
  return QuizAttemptModel.findById(attemptId);
};

export const submitAttempt = async (attemptId, answers) => {
  const attempt = await QuizAttemptModel.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  if (attempt.submittedAt) {
    throw new Error("Attempt already submitted");
  }

  attempt.answers = answers;
  attempt.submittedAt = new Date();

  const questions = await QuestionModel.find({ quizId: attempt.quizId });
  let totalPoints = 0;
  let earnedPoints = 0;

  for (const q of questions) {
    totalPoints += q.points || 1;
    const studentAnswer = attempt.answers.get(q._id.toString());
    if (isCorrectAnswer(q, studentAnswer)) {
      earnedPoints += q.points || 1;
    }
  }

  attempt.score = earnedPoints;
  await attempt.save();
  return attempt;
};

function isCorrectAnswer(question, studentAnswer) {
  switch (question.questionType) {
    case "MULTIPLE_CHOICE":
      const chosen = question.choices[studentAnswer];
      return chosen && chosen.correct === true;

    case "TRUE_FALSE":
      return question.correctAnswer === studentAnswer;

    case "FILL_IN_BLANK":
      if (Array.isArray(question.answers) && Array.isArray(studentAnswer)) {
        if (question.answers.length !== studentAnswer.length) return false;
        return question.answers.every((ans, i) => ans.trim().toLowerCase() === studentAnswer[i].trim().toLowerCase());
      } else if (typeof studentAnswer === 'string') {
        return question.answers.map(a => a.trim().toLowerCase()).includes(studentAnswer.trim().toLowerCase());
      }
      return false;

    default:
      return false;
  }
}
