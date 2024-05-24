const { Schema, model } = require('mongoose');
const { Question } = require('./question.schema');


const FormSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    creationDateTime: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    updateDateTime: {
        type: Date,
    },
    questions: [
        // QuestionSchema
        {
            type: Schema.Types.ObjectId,
            ref: Question
        }
    ]
});

const Form = model('Form', FormSchema);

module.exports = Form;
