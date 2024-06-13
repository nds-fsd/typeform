import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import style from './ResponseForm.module.css';
import RenderQuestion from './RenderQuestion';

const formData = {
  title: 'Form 3',
  status: 'draft',
  creationDateTime: '2024-05-30T21:26:39.630Z',
  _id: '6660e40e59216df405f82e4d',
  questions: [
    {
      _id: '665a40a2a727e7d942581df2',
      text: 'Question 1',
      description: 'This is a sample description for question 1',
      creationDateTime: '2024-05-31T21:18:55.898Z',
      updateDateTime: '2024-05-31T21:18:55.898Z',
      type: 'TextQuestion',
    },
    {
      _id: '668306a75679b08216219pqr',
      text: 'Do you agree with the terms and conditions?',
      description: 'Please select Yes or No',
      creationDateTime: '2024-06-02T10:00:00.000Z',
      updateDateTime: '2024-06-02T10:00:00.000Z',
      type: 'YesNoQuestion',
      choices: [
        {
          label: 'Yes',
          _id: '6680d75494aab859bbef6jkl',
        },
        {
          label: 'No',
          _id: '6682f3e757d462214a529mno',
        },
      ],
    },
    {
      _id: '666306a75679b08216219b04',
      text: 'Text for single choice question',
      description: 'Description for single choice question',
      creationDateTime: '2024-05-31T21:18:55.898Z',
      updateDateTime: '2024-05-31T21:18:55.898Z',
      type: 'SingleChoiceQuestion',
      choices: [
        {
          label: 'option 1',
          _id: '6660d75494aab859bbef6dae',
        },
        {
          label: 'option 2',
          _id: '6662f3e757d462214a529663',
        },
        {
          label: 'option 3',
          _id: '6662f3e757d462214a5ragrs',
        },
      ],
    },
    {
      _id: '667306a75679b08216219b07',
      text: 'Text for multiple choice question',
      description: 'Description for multiple choice question',
      creationDateTime: '2024-06-01T10:00:00.000Z',
      updateDateTime: '2024-06-01T10:00:00.000Z',
      type: 'MultipleChoiceQuestion',
      choices: [
        {
          label: 'Option 1',
          _id: '6670d75494aab859bbef6abc',
        },
        {
          label: 'Option 2',
          _id: '6672f3e757d462214a529def',
        },
        {
          label: 'Option 3',
          _id: '6673f3e757d462214a529ghi',
        },
        {
          label: 'Option 4',
          _id: '6673f3e757d462214a529jir',
        },
      ],
    },
  ],
  __v: 0,
};

const ResponseForm = () => {
  // const [formData, setFormData] = useState();

  // useEffect(() => {
  //   const getForm = async (formId) => {
  //     try {
  //       const res = await api.get(`/form/${formId}`);
  //       setFormData(res.data);
  //     } catch (error) {
  //       console.error('Error fetching form data:', error);
  //     }
  //   };
  //   getForm(formId);
  // },[]);

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      questions: formData.questions,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data) => {
    const submissionData = {
      form: formData._id,
      answers: data.questions.map((question) => ({
        question: question._id,
        type: question.type,
        answer: question.answer,
      })),
      creationDateTime: new Date(),
    };
    console.log(submissionData);
    // const postAwnsers = async () => {
    //   const response = await api()
    //     .post('/url', submissionData)
    //     .then((res) => console.log(res.data))
    //     .catch((err) => console.log(error));
    // };
    // postAwnsers();
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestion = () => {
    const isLastQuestion = currentQuestion === fields.length - 1;
    const newIndex = isLastQuestion ? 0 : currentQuestion + 1;
    setCurrentQuestion(newIndex);
  };

  const prevQuestion = () => {
    const isFirstQuestion = currentQuestion === 0;
    const newIndex = isFirstQuestion ? fields.length - 1 : currentQuestion - 1;
    setCurrentQuestion(newIndex);
  };

  return (
    <div className={style.body}>
      <h2>{formData.title}</h2>
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.questionContainer}>
          {fields.length > 0 && (
            <RenderQuestion
              question={fields[currentQuestion]}
              index={currentQuestion}
              register={register}
              style={style}
            />
          )}
        </div>

        <div onClick={prevQuestion} className={style.navButton}>
          Prev
        </div>
        <div onClick={nextQuestion} className={style.navButton}>
          Next
        </div>
        <button className={style.submitButton} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResponseForm;
