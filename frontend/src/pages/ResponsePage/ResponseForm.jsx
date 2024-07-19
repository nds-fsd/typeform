import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../utils/api.js';
import RenderQuestion from './RenderQuestion.jsx';
import { useParams } from 'react-router-dom';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import FormSubmitModal from './FormSubmitModal.jsx';

const ResponseForm = () => {
  const { id: formId } = useParams();
  const [formData, setFormData] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getForm = async (formId) => {
      console.log('Form id:', formId);
      try {
        const res = await api().get(`/form/${formId}`);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    getForm(formId);
  }, [formId]);

  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      questions: [],
    },
  });

  useEffect(() => {
    if (formData) {
      setValue('questions', formData.questions);
    }
  }, [formData, setValue]);

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  });

  const postAnswer = async (submissionData) => {
    try {
      await api().post(`/formAnswers`, submissionData);
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
        answer: Array.isArray(question.answer) ? question.answer.join(', ') : question.answer,
      })),
      creationDateTime: new Date(),
      updateDateTime: new Date(),
    };
    postAnswer(submissionData);
    setShowModal(true);
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

  const isLastQuestion = fields.length - 1;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-custom-gradient'>
      <h2 className='text-center font-extrabold text-3xl my-5'>{formData.title}</h2>
      <div className='bg-white/50 p-8 rounded-3xl shadow-md w-full max-w-4xl h-96 m-7 flex flex-col items-center relative'>
        <form className='w-full h-full flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col overflow-auto h-full align-center my-5 ml-4'>
            {fields.length > 0 && (
              <RenderQuestion question={fields[currentQuestion]} index={currentQuestion} register={register} />
            )}
          </div>
          {currentQuestion === isLastQuestion && (
            <div className='absolute bottom-5 right-5'>
              <MediumButton onClick={onSubmit} text={'Submit'} />
            </div>
          )}
        </form>
      </div>
      <div className='absolute left-5 right-5 top-1/2 flex transform -translate-y-1/2 justify-between'>
        <button onClick={prevQuestion} className='btn btn-circle'>
          ❮
        </button>
        <button onClick={nextQuestion} className='btn btn-circle'>
          ❯
        </button>
      </div>
      <FormSubmitModal showModal={showModal} />
    </div>
  );
};

export default ResponseForm;
