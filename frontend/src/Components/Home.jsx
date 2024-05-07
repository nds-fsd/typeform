import react from 'react';

const handleClick = () =>{
    console.log("click")
}

const Home = () => {
    return (
        <div>
            <h1> Welcome, to </h1>
            <img src='./Assets/TRANSPARENT.png'/>
            <button onClick={handleClick}> Enter to Surflow </button>
        </div>
        
    )
}

export default Home