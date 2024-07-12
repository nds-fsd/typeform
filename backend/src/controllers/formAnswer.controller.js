const FormSubmission = require('../schemas/formSubmission.schema');
const Form = require('../schemas/form.schema');

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

    const formSubmission = await FormSubmission.find({ form });
    const formData = await Form.findById(form);

    if (!formSubmission || !formData) {
      return res.status(404).json({ error: 'Form not found' });
    }
    const response = formSubmission.map((submission) => ({
      form: {
        _id: formData._id,
        title: formData.title,
      },
      answers: submission.answers.map((answer) => {
        const question = formData.questions.find((question) => question._id.equals(answer.question));
        return {
          question: {
            _id: question._id,
            title: question.text,
            description: question.description,
          },
          answer: answer.answer,
          type: answer.type,
        };
      }),
      creationDateTime: submission.creationDateTime,
      updateDateTime: submission.updateDateTime,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get answers' });
  }
};

module.exports = {
  postAnswer,
  getAnswers,
};


