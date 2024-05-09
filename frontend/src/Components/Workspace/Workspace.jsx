import React from 'react';
import FormCard from '../Form Card/FormCard';

const handleClick = () => {
    console.log ("hice click")
    //acá solo debe haber una ruta que me lleve a newform nada mas es un simple link
} 

const Workspace = () => {
    return (
        <div>
            <button onClick={handleClick}>Add New Form</button>
            <FormCard /> 
        </div>
    )
}

export default Workspace