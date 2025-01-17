import Database from "../Database/index.js";
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return courseAssignments;
}
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
