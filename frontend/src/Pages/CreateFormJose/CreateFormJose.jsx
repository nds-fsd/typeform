import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api.js';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import FormForm from './FormForm.jsx';

export const EditForm = () => {
  const { id } = useParams();
  const { data } = useQuery('form', () => api().get(`/form/${id}`).then(res => res.data));
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: data ?? {}
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setValue('title', data.title || '');
      setValue('questions', data.questions.map((question) => ({
        ...question,
        choices: question.choices || [],
      })) || []);
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    const processedData = {
      ...data,
      questions: data.questions.map((question) => {
        const { _id, ...rest } = question;
        return rest
      })
    };
    api().patch(`/form/${id}`, processedData).then((response) => {
      console.log(response.data);
      queryClient.invalidateQueries('forms');
      navigate('/workspace');
    });
  }

  return (
    <>

      <FormForm register={register} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} />
    </>
  )
}

export const CreateForm = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: '',
      questions: [{
        text: '',
        description: '',
        type: 'TextQuestion'
      }]
    }
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    api().post("/form", data).then((response) => {
      console.log(response.data);
      queryClient.invalidateQueries('forms');
      navigate('/workspace');
    });
  }

  return (
    <FormForm register={register} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} />
  )
}