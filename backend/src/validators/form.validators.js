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
  console.log((data.type === 'MultipleChoiceQuestion' || data.type === 'SingleChoiceQuestion') && data.choices.length > 1);
  return (data.type === 'MultipleChoiceQuestion' || data.type === 'SingleChoiceQuestion') && data.choices.length > 1
},
  {
    message: "There has to be at least two options for the question",
    path: ["choices"]
  });
//console.log(QuestionSchema._applyDiscriminators.YesNoQuestion);
exports.CreateFormBodyValidation = z.object({
  title: z.string(),
  questions: z.array(questionValidationSchema).optional(),
})








// understand this vs above
// }).refine((data) => {
//   // Ensure that choices are provided for MultipleChoiceQuestion and SingleChoiceQuestion
//   if ((data.type === 'MultipleChoiceQuestion' || data.type === 'SingleChoiceQuestion') && (!data.choices || data.choices.length < 2)) {
//     return false;
//   }
//   return true;
// });