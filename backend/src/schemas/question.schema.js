const mongoose = require('mongoose');

const questionSchema = new Schema({
    text: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;