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

    const defaultValues = {
        title: 'My Form',
        questions: [{
            text: '...',
            description: ' ',
            type: 'TextQuestion'
        }]
    };

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset
        // formState: { errors }
    } = useForm({ defaultValues });

    // GET all forms
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['forms'],
        queryFn: fetchForms,
        onSuccess: (data) => {
            setAllForms(data);
        }
    });

    // GET form by id (used in CreateForm and its children), previously:
    // const { formData } = useQuery('form', () => api().get(`/form/${id}`).then(res => res.data));
    // como insertar error, isLoading y isError aqui, para que quede consistente,
    // sin que haya conflicto con los del useQUery anterior (allForms)?
    const { formData } = useQuery({
        queryKey: ['form'],
        queryFn: fetchForm
    });

    const { fields, append, remove: removeQuestion, swap } = useFieldArray({
        control,
        name: "questions"
    });

    // Função de remoção que atualiza formQuestions
    const remove = (index) => {
        removeQuestion(index);
        // Atualiza as questões do formulário após remoção
        setFormQuestions([...fields]);
    };

    const resetForm = () => {
        reset(defaultValues);
        setFormQuestions(defaultValues.questions);
    };

    useEffect(() => {
        // console.log('fields updated:', fields);
        // console.log('watch:', watch());
        setFormQuestions(fields);
    }, [fields]);

    // console.log(formQuestions, 'funciona ----!')

    const value = {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        resetForm,
        data,
        formData,
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
        fields,
        append,
        remove,
        swap,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormProvider = () => useContext(FormContext);

// const { data: formData } = useQuery(
//     ['form', id],
//     () => api().get(`/form/${id}`).then(res => res.data),
//     { enabled: isEditMode }
// );