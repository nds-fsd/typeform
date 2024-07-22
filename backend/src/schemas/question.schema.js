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