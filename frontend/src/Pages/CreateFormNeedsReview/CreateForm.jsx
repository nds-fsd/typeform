import { Link, useParams } from 'react-router-dom';
import { api, fetchForm } from '../../Utils/api';
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import style from './CreateForm.module.css';

const CreateForm = () => {
  // mover lógica para fuera del componente (creacion de API?)
  const { formId } = useParams();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { data, error, isLoading, isError } = useQuery(['form', formId], () => fetchForm(formId));

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [formTitle, setFormTitle] = useState('');
  console.log(questionText);

  // como quito wl fetchForm por ejemplo desde aqui para otro archivo?

  useEffect(() => {
    if (data) {
      setQuestionText(data.questions[0]?.text || '');
      setQuestionType(data.questions[0]?.type || '');
      setFormTitle(data.title || '');
    }
  }, [data]);
  console.log(data);

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      const res = await api().patch(`/form/${formId}`, formData);
      console.log(res.data);
      // Invalidate and refetch the form data
      queryClient.invalidateQueries(['form', formId]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    console.log('Conteúdo atual:', e.target.innerText);
    setQuestionText(e.target.value);
    console.log(questionText);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents line break
      updateQuestionText();
    }
  };

  const updateQuestionText = async () => {
    try {
      const questionId = data.questions[0]._id; // replace absolute index
      console.log(questionId);
      console.log(questionText);

      const res = await api().patch(`form/${formId}`, {
        questions: [
          {
            _id: questionId,
            text: questionText,
          },
        ],
      });
      console.log('Question text updated successfully:', res.data);
      return res.data;
    } catch (error) {
      console.log('Could not update question text: ', error);
    }
  };
  return (
    <div>
      {isLoading && (
        <div>
          <h1>loading...</h1>
        </div>
      )}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <header className={style.fixedHeader}>
            <Link reloadDocument={false} className={style.workspaceLink} to={'/workspace'}>
              my workspace
            </Link>
            <br />
            <div className={style.inputFormTitle} contentEditable type='text' placeholder={data.title}>
              {data.title}
            </div>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('title')} />
            <input type='submit' value='submit' />
          </form>
          {data.updateDateTime && <h3>Update: {data.updateDateTime}</h3>}
          {data.questions[0] && (
            <div>
              <p>Type: {data.questions[0].type}</p>
              <div
                className={style.inputForm}
                type='text'
                role='textbox'
                contentEditable={true}
                placeholder={data.questions[0].text}
                onInput={handleInputChange}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
              >
                {data.questions[0].text}
              </div>
              {data.questions[0].choices && (
                <div>
                  <p>Choices:</p>
                  {data.questions[0].choices.map((choice, i) => (
                    <p>{choice.label}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CreateForm;
