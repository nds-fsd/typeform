const { Schema } = require('mongoose');

const QuestionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    creationDateTime: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    updateDateTime: {
        type: Date,
        default: new Date(),
    },
}, {
    discriminatorKey: 'type'
});

const TextQuestion = QuestionSchema.discriminator('TextQuestion',
    new Schema({
    }));

const QuestionChoice = new Schema({
    label: {
        type: String,
        required: true
    },
});

const MultipleChoiceQuestion = QuestionSchema.discriminator('MultipleChoiceQuestion', new Schema({
    choices: [QuestionChoice]
}));

const SingleChoiceQuestion = QuestionSchema.discriminator('SingleChoiceQuestion', new Schema({
    choices: [QuestionChoice]
}));

const YesNoQuestion = QuestionSchema.discriminator('YesNoQuestion', new Schema({}));

exports.QuestionSchema = QuestionSchema;
