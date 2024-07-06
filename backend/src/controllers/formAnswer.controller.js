const FormSubmission = require('../schemas/formSubmission.schema');
const {
  TextQuestion,
  MultipleChoiceQuestion,
  SingleChoiceQuestion,
  YesNoQuestion,
} = require('../schemas/question.schema');

const postAnswer = async (req, res) => {
  const body = req.body;
  try {
    const answer = await FormSubmission.create({
      form: body.form,
      answers: body.answers,
      creationDateTime: body.creationDateTime,
    });
    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to post answers' });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { form } = req.query;
    const allAnswers = await FormSubmission.find({ form }).populate({
      path: 'answers',
      populate: {
        path: 'question',
        type: function (doc) {
          // Choose the appropriate discriminator model based on the value of the discriminator key
          switch (doc.payload.type) {
            case 'TextQuestion':
              return TextQuestion;
            case 'MultipleChoiceQuestion':
              return MultipleChoiceQuestion;
            case 'SingleChoiceQuestion':
              return SingleChoiceQuestion._id;
            case 'YesNoQuestion':
              return YesNoQuestion;
            default:
              throw new Error('Invalid discriminator value');
          }
        },
      },
    }); // Populating the discriminator key

    if (!allAnswers) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(allAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get answers' });
  }
};

module.exports = {
  postAnswer,
  getAnswers,
};
