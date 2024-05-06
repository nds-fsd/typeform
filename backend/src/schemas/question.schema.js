const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: String
});

const Question = new mongoose.model('Question', questionSchema);


module.exports = Question;