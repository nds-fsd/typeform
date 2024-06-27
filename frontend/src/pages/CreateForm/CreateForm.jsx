import { useEffect } from 'react';
import { api } from '../../utils/api.js';
import { api, fetchForm } from '../../utils/api.js';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue } = useCustomFormProvider();
  const currentForm = forms?.find((form) => form._id === id);

  const isEditMode = !!id;
  console.log('edit mode?', isEditMode)

  // GET form by id (used in CreateForm and its children), previously:
  // const { formData } = useQuery('form', () => api().get(`/form/${id}`).then(res => res.data));
  // como insertar error, isLoading y isError aqui, para que quede consistente,
  // sin que haya conflicto con los del useQUery anterior (allForms)?
  const { data: formData } = useQuery({
    queryKey: ['form'],
    queryFn: () => api().get(`/form/${id}`).then(res => res.data)
  });

  console.log("formdata ok", formData);

  // version funcional de TYP-30:   
  // useEffect(() => {
  //   if (data) {
  //     console.log("data", data);
  //     setValue('title', data.title || '');
  //     setValue('questions', data.questions.map((question) => ({
  //       ...question,
  //       choices: question.choices || [],
  //     })) || []);
  //   }
  // }, [data, setValue]);

  // useEffect(() => {
  //   if (isEditMode && currentForm) {
  //     setValue('title', currentForm.title || '');
  //     setValue('questions', currentForm.questions.map((question) => ({
  //       ...question,
  //       choices: question.choices || [],
  //     })) || []);
  //   } else {
  //     resetForm();
  //   }
  // }, [setValue, currentForm]);

  useEffect(() => {
    if (isEditMode) {
      setValue('title', currentForm.title || '');
      setValue(
        'questions',
        currentForm.questions.map((question) => ({
          ...question,
          choices: question.choices || [],
        })) || [],
      );
      if (isEditMode && formData) {
        setValue('title', formData.title || '');
        setValue('questions', formData.questions.map((question) => ({
          ...question,
          choices: question.choices || [],
        })) || []);
      } else {
        resetForm();
      }
    }, [isEditMode]);
}, [setValue, formData]);

const onSubmit = (data) => {
  if (isEditMode) {
    api()
      .patch(`/form/${id}`, data)
      .then((response) => {
        queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
      });
  } else {
    api()
      .post('/form', data)
      .then((response) => {
        queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
      });
  }
};
return (
  <div className='bg-custom-gradient p-2 box-border h-screen'>
    {!isLoading && (
      <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex h-full'>
          <QuestionList />
          <QuestionForm />
          <QuestionOptions />
        </div>
      </form>
    )}
  </div>
);
});
