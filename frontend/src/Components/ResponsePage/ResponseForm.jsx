import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../Utils/api.js';
import style from './ResponseForm.module.css';
import RenderQuestion from './RenderQuestion';
import { useParams } from 'react-router-dom';

const ResponseForm = () => {
  const { id: formId } = useParams();
  const [formData, setFormData] = useState();

  useEffect(() => {
    const getForm = async (formId) => {
      console.log('Form id:', formId);
      try {
        const res = await api().get(`/form/${formId}`);
        setFormData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    getForm(formId);
  }, [formId]);

  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      questions: formData?.questions,
    },
  });

  useEffect(() => {
    if (formData) {
      setValue('questions', formData.questions);
    }
  }, [formData]);

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  });

  const postAnswer = async (submissionData) => {
    try {
      await api().post('/url', submissionData);
      console.log('Answers submitted successfully', submissionData);
    } catch (error) {
      console.log('Error submitting answers:', error);
    }
  };

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
    postAnswer(submissionData);
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

  if (!formData) return <div>Loading...</div>;

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
