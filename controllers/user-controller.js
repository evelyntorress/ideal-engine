// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



    module.exports = {


  // Get all users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err)); 
  
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => { res.json(user)
        if(!user) {
          res.status(404).json({ message: 'No user with that ID' })
  }})
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId }, 
      req.body, 
      { new: true, runValidators: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(user);
    })
    .catch(err => res.status(400).json(err));
},

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        res.json(user)
        if (!user)
        res.status(404).json({ message: 'No user with this id' })}
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Add a friend
addFriend(req, res) {
  console.log('You are adding a friend');
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if(!user){
        res.status(404).json({ message: 'No user found with this ID' })
      } else {
      res.json(user)
}})
    .catch((err) => res.status(500).json(err));
   },

// Delete a friend

deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if(!user) {
      res.status(404).json({ message: 'No user found with that ID' })
      } else {
       res.json(user)
      }})
    .catch((err) => res.status(500).json(err));
},
    };
