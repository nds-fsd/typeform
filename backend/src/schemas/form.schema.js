// crear new schema conforme estructura
const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    text: String
});

//const Question = mongoose.model('Question', questionSchema);

const formSchema = new Schema({
    title: String,
    status: String,
    creationDateTime: Date,
    // questions: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Question'
    //     }
    // ]
});
const Form = new model('Form', formSchema);

module.exports = Form;