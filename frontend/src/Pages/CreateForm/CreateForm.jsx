import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api.js';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import FormForm from './FormForm.jsx';

export const CreateForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: formData } = useQuery(
    ['form', id],
    () => api().get(`/form/${id}`).then(res => res.data),
    { enabled: isEditMode }
  );
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: isEditMode ? {} : {
      title: 'My form',
      questions: [{
        text: '...',
        description: 'optional description',
        type: 'TextQuestion'
      }]
    }
  });

  useEffect(() => {
    if (formData) {
      console.log("formData:", formData);
      setValue('title', formData.title || '');
      setValue('questions', formData.questions.map((question) => ({
        ...question,
        choices: question.choices || [],
      })) || []);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    console.log('Original data:', data);
    if (isEditMode) {
      const processedData = {
        ...data,
        questions: data.questions.map(({ _id, ...rest }) => rest)
      };

      const { _id, ...formWithoutId } = processedData;

      console.log('Processed data (without _id):', formWithoutId);

      api().patch(`/form/${id}`, formWithoutId).then((response) => {
        console.log(response.data);
        queryClient.invalidateQueries('forms');
        // navigate('/workspace');
      }).catch((error) => {
        console.error('Failed to update form:', error);
      });
    } else {
      api().post('/form', data).then((response) => {
        queryClient.invalidateQueries('forms');
        navigate('/workspace');
      }).catch((error) => {
        console.log('Failed to creat form:', error)
      })
    }
  }

  return (
    <>
      <FormForm register={register} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} idForm={id} />
    </>
  )
}