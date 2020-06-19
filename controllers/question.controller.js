const Question = require('../models/question.model.js');

// create and save
exports.create = (req, res) => {
  // Validate request
     if(!req.body._id) {
         return res.status(400).send({
             message: "Question content can not be empty"
         });
     }

     // Create an Question
     const question = new Question({
         _id: req.body._id || "Untitled Question",
         ques : req.body.ques,
         options : req.body.options,
         ans: req.body.ans,
     });

     // Save Question in the database
     question.save()
     .then(data => {
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating the Question."
         });
     });
};

// Retrieve and return all
exports.    findAll = (req, res) => {
  Question.find()
    .then(questions => {
        res.send(questions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving questions."
        });
    });
};

// Find one by ID
exports.findOne = (req, res) => {
  Question.findById(req.params.questionIds)
   .then(question => {
       if(!question) {
           return res.status(404).send({
               message: "Question not found with id " + req.params.questionIds
           });
       }
       res.send(question);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Question not found with id " + req.params.questionIds
           });
       }
       return res.status(500).send({
           message: "Error retrieving question with id " + req.params.questionIds
       });
   });
};

// Update a question identified by the questionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body._id) {
        return res.status(400).send({
            message: "Question content can not be empty"
        });
    }
    // Find question and update it with the request body
    Question.findByIdAndUpdate(req.params.questionIds, {
      _id: req.body._id || "Untitled Question",
      ques: req.body.ques,
      options: req.body.options,
      ans: req.body.ans
    }, {new: true})
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "Question not found with id " + req.params.questionIds
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Question not found with id " + req.params.questionIds
            });
        }
        return res.status(500).send({
            message: "Error updating question with id " + req.params.questionIds
        });
    });
};

// Delete
exports.delete = (req, res) => {
  Question.findByIdAndRemove(req.params.questionIds)
     .then(question => {
         if(!question) {
             return res.status(404).send({
                 message: "Question not found with id " + req.params.questionIds
             });
         }
         res.send({message: "Question deleted successfully!"});
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Question not found with id " + req.params.questionIds
             });
         }
         return res.status(500).send({
             message: "Could not delete question with id " + req.params.questionIds
         });
     });
};
