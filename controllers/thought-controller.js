const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No thoughts with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
  
  
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) => {
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : thoughts.deleteMany({ _id: { $in: thoughts.user }})
      })
      .then(() => res.json({ message: 'Thought and user deleted!' }))
      .catch((err) => res.status(500).json(err));
},



// POST to create a reaction stored in a single thought's reactions array field
  // Add reaction to a thought
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Delete reaction from a thought
  deleteReaction(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reaction: { rectionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

