import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const [formData, setFormData] = useState({});
    const [error,setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({});


    const handleChange = (event) => {
        setFormData(data)
    }

    const onSubmit = data => console.log(data)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input type="email" require id="email" value={formData.email} onChange={handleChange}/>
                <label htmlFor="password"> Contraseña </label>
                <input htmlFor="password" require id="password" value={formData.password} onChange={handleChange}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
        );     
    };
    

export default Login;