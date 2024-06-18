import { createContext, useState } from "react";
import { fetchForms } from "../utils/api";
import { useQuery } from "react-query";

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
    const [onEditForm, setOnEditForm] = useState('default value of form context');
    const [allForms, setAllForms] = useState();

    return (
        <FormContext.Provider value={allForms}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormProvider = () => useContext(FormContext);


// const { data: formData } = useQuery(
//     ['form', id],
//     () => api().get(`/form/${id}`).then(res => res.data),
//     { enabled: isEditMode }
// );