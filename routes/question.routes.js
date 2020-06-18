module.exports = (app) => {
  const questions = require('../controllers/question.controller.js');

  // Create
  app.post('/questions', questions.create);

  // Read all
  app.get('/questions', questions.findAll);

  // Find one by ID
  app.get('/questions/:questionIds', questions.findOne);

  // Update
  app.put('/questions/:questionIds', questions.update);

  // Delete
  app.delete('/questions/:questionIds', questions.delete);
}
