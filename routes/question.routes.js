module.exports = (app) => {
  const questions = require('../controllers/question.controller.js');

  // Create
  app.post('/questions', questions.create);

  // Read all
  app.get('/questions', questions.findAll);


  // Update
  app.put('/questions/:questionIds', questions.update);

  // Delete
  app.delete('/questions/:questionIds', questions.delete);
}
