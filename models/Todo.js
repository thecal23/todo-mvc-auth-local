const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
