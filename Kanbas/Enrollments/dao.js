import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}
export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
export function addEnrollment(enrollment) {
  const newEnrollment = { ...enrollment, _id: Date.now().toString() };
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
}
export function removeEnrollment(userId, courseId) {
  const index = Database.enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index !== -1) {
    Database.enrollments.splice(index, 1);
    return true;
  }
  return false;
}