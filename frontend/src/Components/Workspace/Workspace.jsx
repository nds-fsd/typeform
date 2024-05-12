import React from 'react';
import FormCard from '../Form Card/FormCard';
import style from './Workspace.module.css';

const handleClick = () => {
    console.log ("hice click")
    //acá solo debe haber una ruta que me lleve a newform nada mas es un simple link
} 

const Workspace = () => {
    return (
        <div className={style.viewport}>
            <h1>My Workspace</h1>
            <div className={style.frame}>
                <button onClick={handleClick}>Add New Form</button>
                <FormCard className={style.formcard} /> 
            </div>
        </div>
        
    )
}

export default Workspace