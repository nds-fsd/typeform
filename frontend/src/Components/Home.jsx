import React from 'react';

const handleClick = () =>{
    alert("click")
}

const Home = () => {
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <h1> Welcome, to </h1>
                <img style={{width: 200}} src='src/Assets/TRANSPARENT.png'/>
            </div>
            <button onClick={handleClick}> Enter to Surflow </button>
        </div>    
    )
}

export default Home