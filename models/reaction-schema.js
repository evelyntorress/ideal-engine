const { Schema, model, Types } = require('mongoose');


// Reaction schema
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.ObjectId,
        default: () => new Types.ObjectId()
        
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
          get: date => date
        }
      },
          {
            toJSON: {
              virtuals: true
          },
          id: false,
      }
    );
      
    module.exports = reactionSchema;
  