import mongoose, { Schema } from 'mongoose';
import { QuestionSchema } from './question.schema';

exports.FormAnswerSchema = new mongoose.Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  type: { type: String, required: true, validate: (v) => {
      return Object.keys(QuestionSchema.discriminators).includes(v)
    } },
  answer: String,
});
