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
  };
  
  // Delete a thought
  deleteThoughts(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : thoughts.deleteMany({ _id: { $in: thoughts.user } })
      )
      .then(() => res.json({ message: 'Thoughts and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },


// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value