const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    text: String
});

const Question = model('Question', questionSchema);

module.exports = Question;