import React from 'react';
import style from './Home.module.css';

const handleClick = () =>{
    window.location.href = 'http://localhost:3000/workspace'
}

const Home = () => {
    return (
    <div className={style.background}>    
        <div className={style.container}>
            <div className={style.welcome}>
                <div className={style.logo}>
                    <img style={{width: 318, height: 60 }} src='src/Assets/Surflow logo@2x.png'/>
                </div>
                <h1> Are your surveys ready to <span className={style.flow}>FLOW</span>? </h1>
                <button onClick={handleClick}> <span className={style.yes}>Yes!</span>, Let's do this! </button>   
            </div>
        </div>    
    </div>
    ) 
}

export default Home