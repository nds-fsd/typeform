import { useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';




const EditForm = () => {
    // mover lógica para fuera del componente (creacion de API?)
    const { formId } = useParams();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    const fetchForm = async () => {
        const res = await api().get(`/form/${formId}`);
        console.log(res.data)
        return res.data;
    };
    const { data, error, isLoading, isError } = useQuery('form', fetchForm);

    const [formTitle, setFormTitle] = useState()
    const handleTitleChange = (event) => {
        setFormTitle(event.target.value);
    };

    console.log(formTitle)
    // const getFormById = async (formId) => {
    //     try {
    //         const res = await api().get('/form');
    //         return res.data;
    //     } catch (error) {
    //         console.log('Error fetching form')
    //     }
    // }
    return (
        <div>
            {isLoading &&
                <div><h1>Loading...</h1></div>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <div>

                    <h3>Created: {data.creationDateTime}</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title")} />



                    </form>
                    <h2>{data.title}</h2>
                    <input type="text" value={formTitle} placeholder={data.title} onChange={handleTitleChange} />

                    {data.updateDateTime && <h3>Update: {data.updateDateTime}</h3>}
                    {data.questions[0] && (
                        <div>
                            <p>Type: {data.questions[0].type}</p>
                            <p>Text: {data.questions[0].text}</p>
                            {data.questions[0].choices &&
                                <div>
                                    <p>Choices:</p>
                                    {data.questions[0].choices.map((choice, i) => (
                                        <input type="radio" key={choice._id} value={choice.label} />
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
export default EditForm;