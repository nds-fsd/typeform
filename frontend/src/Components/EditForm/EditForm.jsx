import { useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { useQuery, useQueryClient } from 'react-query';


const EditForm = () => {
    // mover lógica para fuera del componente (creacion de API?)
    const { formId } = useParams();

    const fetchForm = async () => {
        const res = await api().get(`/form/${formId}`);
        console.log(res.data)
        return res.data;
    };
    const { data, error, isLoading, isError } = useQuery('form', fetchForm);

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
                    <h2>{data.title}</h2>
                    <h3>Created: {data.creationDateTime}</h3>
                    {data.updateDateTime && <h3>Update: {data.updateDateTime}</h3>}
                    {data.questions[0] && (
                        <div>
                            <p>Type: {data.questions[0].type}</p>
                            <p>Text: {data.questions[0].text}</p>
                            {data.questions[0].choices && (
                                <div>
                                    <p>Choices:</p>
                                    {data.questions[0].choices.map((choice, i) => (
                                        <p key={i}>{choice.label}</p>
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
export default EditForm;