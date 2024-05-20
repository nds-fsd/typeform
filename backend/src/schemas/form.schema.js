const { Schema, model } = require('mongoose');
const { QuestionSchema } = require('./question.schema');


const FormSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    status: {type: String, enum: ['draft', 'published'], default: 'draft'},
    creationDateTime: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    editDateTime: {
        type: Date,
        // quizá sea útil registrar hora de la última edición(?)
        default: undefined
    },
    questions: [
        QuestionSchema
    ]
});




const Form = model('Form', FormSchema);

module.exports = Form;
