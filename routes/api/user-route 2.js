const router = require('express').Router();
const {
  getUsers,
  getSingleUsert,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('./c');

// /api/students
router.route('/').get(getStudents).post(createStudent);

// /api/students/:studentId
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;






// /api/users


// GET all users


// GET a single user by its _id and populated thought and friend data


// POST a new user:



// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }


// PUT to update a user by its _id


// DELETE to remove user by its _id


// BONUS: Remove a user's associated thoughts when deleted.
