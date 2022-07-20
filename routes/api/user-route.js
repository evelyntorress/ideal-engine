const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
 
} = require('../../controllers/user-controller');

// Get all users/Create user
router.route('/').get(getUsers).post(createUser);

// Get user by Id/put-update and delete
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:usersId/friend - Adding and deleting a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;