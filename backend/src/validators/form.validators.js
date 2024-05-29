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
  // está bien la organizacion/indentacion abajo?
  if (
    (
      data.type === 'MultipleChoiceQuestion'
      || data.type === 'SingleChoiceQuestion'
    ) && (
      !data.choices || data.choices.length < 2
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

// // resultou em comportamento estranho em CREATE method (retornou erro corretamente para 
// // SingleChoice mas para MultipleChoice fez ö contrario", osea, ha dejado crear con una sola
// pregunta, pero no com varias!):

// .refine((data) => {
//   return (
//     (data.type === 'SingleChoiceQuestion' && (!data.choices || data.choices.length !== 1))
//     || (data.type === 'MultipleChoiceQuestion' && (!data.choices || data.choices.length < 2))
//   )
// },
//   {
//     message: "At least two options are requires for this type of the question",
//     path: ["choices"]
//   });

//   // Verifica labels duplicados
//   const labels = data.choices.map(choice => choice.label);
//   return new Set(labels).size === labels.length; // Retorna verdadeiro se todas as opções são únicas
// },