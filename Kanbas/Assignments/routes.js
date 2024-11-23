import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
      res.json(updatedAssignment);
    } catch (error) {
      console.error("Failed to update assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    console.log("Calling deleteAssignment...");
    console.log("deleteAssignment function:", dao.deleteAssignment);
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });
}
