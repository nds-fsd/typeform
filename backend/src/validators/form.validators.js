import z from 'zod';
import { QuestionSchema } from '../schemas/question.schema';


const questionValidationSchema = z.object({
    text: z.string(),
    description: z.string().optional(),
    type: z.enum(Object.keys(QuestionSchema.discriminators)),
    choices: z.array(z.object({
      label: z.string(),
    })).optional(),
}).refine((data) => {
  if(data.type === 'MultipleChoiceQuestion' || data.type === 'SingleChoiceQuestion') {
    return data.choices.length > 1;
  }
});


exports.CreateFormBodyValidation = z.object({
  title: z.string(),
  questions: z.array(questionValidationSchema).optional(),
})
