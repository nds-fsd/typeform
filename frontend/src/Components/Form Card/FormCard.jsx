import React, { useState, useEffect } from 'react';
import style from './FormCard.module.css';
import { url } from '../../utils/utils.js'

const handleClickForm = (id) => {

    // const [form, setForm] = useState();
    const getForm = async () => {
        try {
            const response = await fetch(`${url}/form/${id}`);
            if (!response.ok) throw new Error('Couldn\'t fetch the form');
            const form = await response.json();
            // setForm(data);
            console.log(form);
            console.log(form.questions[0].text)
            alert(form.questions[0].choices[0].label)
        } catch (error) {
            alert(error)
        }
    };
    getForm()
}


const FormCard = () => {

    const [forms, setForms] = useState([])

    useEffect(() => {
        const url = 'http://localhost:3001/form'; //reemplazar url real
        const getForms = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Something bad happended');
                const json = await response.json();
                setForms(json);
            } catch (error) {
                alert(error);
            }
        }
        getForms();
    }, []);

    return (
        <div className={style.formgrid}>
            {forms.map((form, index) => (<button className={style.formcard} key={index} onClick={() => handleClickForm(form._id)}>{form.title}</button>))}
        </div>
    )
}
export default FormCard

// hay un use effect por lo que cada vez que entremos a workspace va a ejecutar un get y tiene que ser solo el title