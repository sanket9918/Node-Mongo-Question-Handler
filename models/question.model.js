const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  questionId: String,
  questions: String,
  options: String,
  ans: String,
  
});

module.exports = mongoose.model('Question', QuestionSchema);
