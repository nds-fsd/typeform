const { Schema, model } = require('mongoose');
const { FormAnswerSchema } = require('./formAnswer.schema');

const FormSubmissionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answers: [
    FormAnswerSchema
  ],
  creationDateTime: {
    type: Date,
    default: new Date(),
    immutable: true
  },
  editDateTime: {
    type: Date,
    default: undefined
  },
});

const FormSubmission = model('FormSubmission', FormSubmissionSchema);

module.exports = FormSubmission;
