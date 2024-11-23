import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });
  app.post("/api/enrollments", (req, res) => {
    const enrollment = req.body;
    const newEnrollment = dao.addEnrollment(enrollment);
    res.status(201).json(newEnrollment);
  });
  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    const success = dao.removeEnrollment(userId, courseId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Enrollment not found" });
    }
  });
}
