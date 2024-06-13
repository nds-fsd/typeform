import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { api } from '../../Utils/api.js';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const questionTypes = [
  {
    value: 'TextQuestion',
    label: 'Text Question',
  },
  {
    value: 'MultipleChoiceQuestion',
    label: 'Multiple Choice Question',
  },
  {
    value: 'SingleChoiceQuestion',
    label: 'Single Choice Question',
  },
];

const Choices = ({ register, control, index }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: `questions[${index}].choices`,
  });

  return (
    <div>
      {fields.map((choice, choiceIndex) => (
        <div>
          <label>Choice</label>
          <input type='text' {...register(`questions[${index}].choices[${choiceIndex}].label`)} />
        </div>
      ))}
      <button type='button' onClick={() => append({})}>
        Add Choice
      </button>
    </div>
  );
};

const QuestionForm = ({ register, index, watch, control }) => {
  const type = watch(`questions[${index}].type`);

  return (
    <div>
      <label>Question Type</label>
      <select {...register(`questions[${index}].type`, { value: 'TextQuestion' })}>
        {questionTypes.map((questionType) => (
          <option value={questionType.value}>{questionType.label}</option>
        ))}
      </select>
      <label>Text</label>
      <input type='text' {...register(`questions[${index}].text`)} />
      <label>Description</label>
      <input type='text' {...register(`questions[${index}].description`)} />
      {type !== 'TextQuestion' && <Choices register={register} control={control} index={index} />}
    </div>
  );
};

const FormForm = ({ register, handleSubmit, onSubmit, watch, control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'questions',
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type='text' {...register('title')} />

        {fields.map((question, index) => (
          <QuestionForm register={register} index={index} watch={watch} control={control} />
        ))}
        <button type='button' onClick={() => append({})}>
          Add Question
        </button>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export const EditForm = () => {
  const { id } = useParams();

  const { data } = useQuery('form', () =>
    api()
      .get(`/form/${id}`)
      .then((res) => res.data),
  );

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: data ?? {},
  });

  useEffect(() => {
    if (data) {
      console.log('data', data);
      setValue('title', data.title);
      setValue('questions', data.questions);
    }
  }, [data, setValue()]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    api()
      .patch(`/form/${id}`, data)
      .then((response) => {
        console.log(response.data);
        queryClient.invalidateQueries('forms');
        navigate('/workspace');
      });
  };
  return (
    <FormForm register={register} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} />
  );
};

export const CreateFormJose = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: '',
      questions: [
        {
          text: '',
          description: '',
          type: 'TextQuestion',
        },
      ],
    },
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    api()
      .post('/form', data)
      .then((response) => {
        console.log(response.data);
        queryClient.invalidateQueries('forms');
        navigate('/workspace');
      });
  };

  return (
    <FormForm register={register} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} />
  );
};
