const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  goals: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      title: {
        type: String,
        required: true
      },
      priority: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      description: {
        type: String
      },
      done: {
        type: Boolean,
        default: false
      }
    }
  ],
  team: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      avatar: {
        type: String
      },
      role: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Project = mongoose.model('project', ProjectSchema);