const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  _id: String,
  ques: String,
  options: String,
  ans: String,
  
});

module.exports = mongoose.model('Question', QuestionSchema);
