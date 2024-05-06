// crear new schema conforme estructura
const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//     text: String
// });

// const Question = mongoose.model('Question', questionSchema);

const formSchema = new mongoose.Schema({
    title: String,
    status: String,
    creationDateTime: Date,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});
const Form = new mongoose.model('Form', formSchema);

module.exports = Form;