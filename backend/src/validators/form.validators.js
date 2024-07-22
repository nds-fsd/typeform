const z = require('zod');
const { QuestionSchema } = require('../schemas/question.schema');


const questionTypes = Object.keys(QuestionSchema._applyDiscriminators);

const questionValidationSchema = z.object({
  text: z.string(),
  description: z.string().optional(),
  type: z.enum(questionTypes),
  choices: z.array(z.object({
    label: z.string(),
  })).optional(),
}).refine((data) => {
  if (
    (
      data.type === 'MultipleChoiceQuestion'
      || data.type === 'SingleChoiceQuestion'
    ) && (
      !data.choices
    )
  ) {
    return false;
  }
  return true;
}, {
  message: "At least two unique options are required for this type of question",
  path: ["choices"],
});

exports.CreateFormBodyValidation = z.object({
  title: z.string(),
  questions: z.array(questionValidationSchema).optional(),
})