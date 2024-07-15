const { Schema } = require('mongoose');

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      default: '...',
    },
    description: {
      type: String,
    },
    creationDateTime: {
      type: Date,
      default: new Date(),
      immutable: true,
    },
    updateDateTime: {
      type: Date,
      default: new Date(),
    },
  },
  {
    discriminatorKey: 'type',
  },
);

exports.TextQuestion = QuestionSchema.discriminator('TextQuestion', new Schema({}));

const QuestionChoice = new Schema({
  choices: [
    {
      label: {
        type: String,
        required: false
      },
    },
  ],
});

exports.MultipleChoiceQuestion = QuestionSchema.discriminator('MultipleChoiceQuestion', QuestionChoice);

exports.SingleChoiceQuestion = QuestionSchema.discriminator('SingleChoiceQuestion', QuestionChoice);

exports.YesNoQuestion = QuestionSchema.discriminator('YesNoQuestion', new Schema({}));

exports.QuestionSchema = QuestionSchema;

// // quisiera entender porque eso no ha funcionado para crear automaticamente las opciones para YesNo type:
// // ------VERSION 1
// const YesNoQuestionSchema = new Schema({
//     choices: [{
//         label: {
//             type: String,
//             enum: ['Yes', 'No'],
//             default: 'Yes',
//         },
//     }],
// });

// const YesNoQuestion = QuestionSchema.discriminator('YesNoQuestion', YesNoQuestionSchema);

// // ----------VERSION 2 - declarado irectamente
// const YesNoQuestion = QuestionSchema.discriminator('YesNoQuestion', new Schema({
//     choices: [
//         { label: { type: String, default: 'Yes' } },
//         { label: { type: String, default: 'No' } }
//     ]
// }));
