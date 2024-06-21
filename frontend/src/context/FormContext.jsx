import { createContext, useState, useContext, useEffect } from "react";
import { fetchForm, fetchForms } from "../utils/api";
import { useQuery, useQueryClient } from "react-query";
import { useFieldArray, useForm } from "react-hook-form";

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
    const [currentForm, setCurrentForm] = useState();
    const [allForms, setAllForms] = useState({});
    const [formQuestions, setFormQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const queryClient = useQueryClient();
    // GET all forms
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['forms'],
        queryFn: fetchForms,
        onSuccess: (data) => {
            setAllForms(data);
        }
    });

    // const defaultValues = {
    //     title: 'My Form',
    //     questions: [{
    //         text: '...',
    //         description: ' ',
    //         type: 'TextQuestion'
    //     }]
    // };
    const { data: formData } = useQuery({
        queryKey: ['form'],
        queryFn: () => api().get(`/form/${id}`).then(res => res.data)
    });

    console.log("formdata ok", formData);
    const { register, control, handleSubmit, watch, setValue, reset: resetForm } = useForm({
        defaultValues: formData ?? {
            title: 'My form',
            questions: [{
                text: '...',
                description: ' ',
                type: 'TextQuestion'
            }]
        }
    });
    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     watch,
    //     setValue,
    //     reset
    //     // formState: { errors }
    // } = useForm({ defaultValues });
    const { fields: questionsFields, append, remove, swap } = useFieldArray({
        control,
        name: "questions"
    });
    // // Função de remoção que atualiza formQuestions
    // const remove = (index) => {
    //     removeQuestion(index);
    //     // Atualiza as questões do formulário após remoção
    //     setFormQuestions([...fields]);
    // };

    // const resetForm = () => {
    //     reset();
    // setFormQuestions(defaultValues.questions);

    useEffect(() => {
        // console.log('fields updated:', fields);
        // console.log('watch:', watch());
        setFormQuestions(questionsFields);
    }, [questionsFields]);

    const value = {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        resetForm,
        data,
        error,
        isLoading,
        isError,
        queryClient,
        currentForm,
        setCurrentForm,
        allForms,
        setAllForms,
        formQuestions,
        setFormQuestions,
        selectedQuestion,
        setSelectedQuestion,
        questionsFields,
        append,
        remove,
        swap,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormProvider = () => useContext(FormContext);

// const { data: formData } = useQuery(
//     ['form', id],
//     () => api().get(`/form/${id}`).then(res => res.data),
//     { enabled: isEditMode }
// );