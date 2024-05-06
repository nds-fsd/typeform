const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: String,
    status: String,
    creationDateTime: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    editDateTime: {
        type: Date,
        default: new Date()
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

const Form = new mongoose.model('Form', formSchema);

module.exports = Form;