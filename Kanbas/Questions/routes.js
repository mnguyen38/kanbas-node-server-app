import * as dao from "./dao.js";
import quizModel from "../Quizzes/model.js"; 

export default function QuestionRoutes(app) {
  app.get("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const question = await dao.findQuestionById(quizId, questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  });

  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questionData = req.body;
    const newQuestion = await dao.createQuestion(quizId, questionData);

    await updateQuizStats(quizId);

    res.json(newQuestion);
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const questionUpdates = req.body;
    const updated = await dao.updateQuestion(quizId, questionId, questionUpdates);

    if (!updated) {
      return res.status(404).json({ error: "Question not found" });
    }
    await updateQuizStats(quizId);

    res.json(updated);
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.deleteQuestion(quizId, questionId);
    if (status.deletedCount === 0) {
      return res.status(404).json({ error: "Question not found or already deleted" });
    }

    await updateQuizStats(quizId);

    res.sendStatus(204);
  });

  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });
}

async function updateQuizStats(quizId) {
  const questions = await dao.findQuestionsForQuiz(quizId);
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  await quizModel.findByIdAndUpdate(quizId, {
    $set: {
      points: totalPoints,
      numberOfQuestions: questions.length
    }
  });
}
