import * as dao from "./dao.js";
import quizModel from "../Quizzes/model.js";

export default function QuizAttemptRoutes(app) {
  app.post("/api/quizzes/:quizId/attempts/:userId", async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const quiz = await quizModel.findById(quizId);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });

      if (!quiz.isPublished) {
        return res.status(403).json({ error: "Quiz not available" });
      }

      const now = new Date();
      if (quiz.availableFrom && now < quiz.availableFrom) {
        return res.status(403).json({ error: "Quiz not available yet" });
      }
      if (quiz.availableUntil && now > quiz.availableUntil) {
        return res.status(403).json({ error: "Quiz is closed" });
      }

      const attemptsCount = await dao.countAttemptsForStudentAndQuiz(quizId, userId);
      if (!quiz.multipleAttempts && attemptsCount > 0) {
        return res.status(403).json({ error: "No remaining attempts" });
      }
      if (quiz.multipleAttempts && attemptsCount >= quiz.maxAttempts) {
        return res.status(403).json({ error: "No remaining attempts" });
      }

      const newAttempt = await dao.createAttempt(quizId, userId, attemptsCount + 1);
      res.json(newAttempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/attempts/:attemptId/submit/:userId", async (req, res) => {
    try {
      const { attemptId, userId } = req.params;
      const { answers } = req.body;
      const attempt = await dao.findAttemptById(attemptId);
      if (!attempt) return res.status(404).json({ error: "Attempt not found" });

      if (attempt.studentId.toString() !== userId) {
        return res.status(403).json({ error: "Not your attempt" });
      }

      const updatedAttempt = await dao.submitAttempt(attemptId, answers);
      res.json(updatedAttempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/quizzes/:quizId/lastAttempt/:userId", async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempt = await dao.findLastAttemptForStudentAndQuiz(quizId, userId);
      if (!attempt) return res.status(404).json({ error: "No attempts found" });
      res.json(attempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
}
