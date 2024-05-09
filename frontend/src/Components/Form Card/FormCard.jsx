import React, { useState, useEffect } from 'react';
import style from './FormCard.module.css';


const FormCard = () => {

    const [forms, setForms] = useState([])

    // useEffect(() => {
    //     const url = 'http://localhost:3001/forms'; //reemplazar url real
    //     const getForms = async () => {
    //         try {
    //             const response = await fetch (url);
    //             if (!response.ok) throw new Error('Something bad happended');
    //             const json = await response.json();
    //             setForms(json);
    //         } catch(error) {
    //             alert(error);
    //         }
    //     }
    //     getForms();
    // }, []);

    useEffect(() => {
        const getForms = [
        {
            title: "form 1"
        },
        {
            title: "form 2"
        },
        {
            title: "form 3"
        }
    ]; //reemplazar esto por el fetch


    setForms(getForms); 
}, []);
    

    return (
        <div>
            {forms.map((form,index) => (<p className={style.parag} key={index}>{form.title}</p>))}
        </div>
    )  
}
export default FormCard

// hay un use effect por lo que cada vez que entremos a workspace va a ejecutar un get y tiene que ser solo el title