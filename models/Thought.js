const { Schema, model } = require('mongoose');


// Schema to create thought model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_lenght:1,
      max_length: 280

    },
    createAt: {
     type: Date,
     default: Date.now,
     get:  // I need to fill this part ========================================

//      let schema = new mongoose.Schema(
//       {
//          name: String,
//          dob: {
//                  type: Date,
//                  get: (date) => {
//                    if (date) return date.toISOString().split("T") [0];
//                  },
//          },
 
//          createdAt: {
//                  type: Date,
//                  get: (date) => timeSince(date),
//          }
//          updatedAt: {
//                  type: Date,
//                  get: (date) => timeSince(date),
//          },
//       },
//       {
//         timestamps: true,
//         toJSON: { getters: true, virtuals: true },
//       }
//  );
 
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
    {
      toJSON: {
         getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;


// Reaction schema
const reactionSchema = new Schema(
  
    reactionId: {
      type: Schema.ObjectId,
      default: new.Types.ObjectId
      },

    reactionBody: {
      type: String,
      required: true,
      max_length: 280
      },

      username: {
        type: String,
        required: true,
      },

      createAt: {
        type: Date,
        default: Date.now,
        get:  
// I need to fill this part
      },

        {
          toJSON: {
            virtuals: true
        },
        id: false,
    }
  );
    


