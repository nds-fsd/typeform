const { Schema, model } = require('mongoose');

const formSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    status: String,
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
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

const Form = model('Form', formSchema);

module.exports = Form;