import { useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';


const CreateForm = () => {
    // mover lógica para fuera del componente (creacion de API?)
    const { formId } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm();
    const [formTitle, setFormTitle] = useState()
    // como quito wl fetchForm por ejemplo desde aqui para otro archivo?
    const fetchForm = async () => {
        try {
            const res = await api().get(`/form/${formId}`);
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log('Error fetching form')
        };
    }
    const { data, error, isLoading, isError } = useQuery(['form', formId], fetchForm);

    const onSubmit = async (formData) => {
        try {
            console.log(formData)
            const response = await api().patch(`/form/${formId}`, formData);
            console.log(response.data);
            // Invalidate and refetch the form data
            queryClient.invalidateQueries(['form', formId]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isLoading &&
                <div><h1>Loading...</h1></div>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title")} />
                        <input type="submit" value="submit" />
                    </form>
                    <h2>{data.title}</h2>
                    {data.updateDateTime && <h3>Update: {data.updateDateTime}</h3>}
                    {data.questions[0] && (
                        <div>
                            <p>Type: {data.questions[0].type}</p>
                            <p>Text: {data.questions[0].text}</p>
                            {data.questions[0].choices &&
                                <div>
                                    <p>Choices:</p>
                                    {data.questions[0].choices.map((choice, i) => (
                                        <p>{choice.label}</p>
                                    ))}
                                </div>
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default CreateForm;