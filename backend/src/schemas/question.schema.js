const { Schema, model } = require('mongoose');

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
console.log(Object.keys(QuestionSchema._applyDiscriminators)); // This should print discriminator keys

const Question = model('Question', QuestionSchema)

module.exports = {
    QuestionSchema,
    Question,
    TextQuestion,
    MultipleChoiceQuestion,
    SingleChoiceQuestion,
    YesNoQuestion
};

// // OTRA ALTERNATIVA, MÁS "SIMPLES"(DISCRIMINATORS DECLARADOS DENTRO DEL PROPIO SCHEMA)
// const { Schema, model } = require('mongoose');

// const QuestionSchema = new Schema({
//     text: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: false
//     },
//     creationDateTime: {
//         type: Date,
//         default: Date.now,
//         immutable: true
//     },
//     updateDateTime: {
//         type: Date,
//         default: Date.now
//     },
//     type: {
//         type: String,
//         enum: ['TextQuestion', 'MultipleChoiceQuestion', 'SingleChoiceQuestion', 'YesNoQuestion'],
//         required: true
//     },
//     choices: [{
//         label: String
//     }]
// });

// const Question = model('Question', QuestionSchema);

// module.exports = { Question };
