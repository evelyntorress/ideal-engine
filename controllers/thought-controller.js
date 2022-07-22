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
        .then((thoughts) => {
          !thoughts
            ? res.status(404).json({ message: 'No thoughts with this id!' })
            : res.json(thoughts)
    })
        .catch((err) => res.status(500).json(err));
    },
  
  
  // Delete a thought
  deleteThought(req, res) {
    console.log("I am in deleteThought")
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add reaction
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
  })
      .catch((err) => res.status(500).json(err));
  },


  // Delete reaction 
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if(!dbThoughtData){
         
              return res.status(404)
              .json({ message: 'No user found with that ID' })
        }
          res.json(dbThoughtData)
  })
      .catch((err) => res.status(500).json(err));
  },
};