import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizData = { ...req.body, course: courseId };
    const newQuiz = await dao.createQuiz(quizData);
    res.json(newQuiz);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updatedQuiz = await dao.updateQuiz(quizId, quizUpdates);
    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(updatedQuiz);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    if (status.deletedCount === 0) {
      return res.status(404).json({ error: "Quiz not found or already deleted" });
    }
    res.sendStatus(204);
  });

  app.post("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const updatedQuiz = await dao.togglePublishQuiz(quizId);
    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(updatedQuiz);
  });
}
