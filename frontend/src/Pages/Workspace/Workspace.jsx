import React from 'react';
import FormCard from '../../Components/Form Card/FormCard';
import { api } from '../../Utils/api';
import { MediumButton } from '../../Components/Buttons/MediumButton';
import { useNavigate } from 'react-router-dom';
import Profile from '../../Components/Profile/Profile';

const Workspace = () => {
const navigate = useNavigate();

const handleClick = () => {
  navigate('/createforms');
};
  return (
    <div className="bg-custom-gradient min-h-screen w-screen overflow-y-auto relative">
      <div className="m-5 bg-white p-5 rounded-2xl shadow-md relative">
        <h1 className="text-gray-900 text-3xl mb-8 ml-8 mt-2">My Workspace</h1>
        <div className="flex flex-col space-y-4">
            <Profile />
            <div className='ml-8 mb-40 pb-20'>
              <MediumButton onClick={handleClick} text="Add New Form" />
            </div>
          <div className="grid grid-cols-1 gap-4"> 
            <FormCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

//// tentativa de crear un nuevo form al hacer click en el boton
////y luego despues dirigirse a /createform/:newlyCreated_id
// const Workspace = () => {
//   const history = useHistory();

//   const handleClick = async () => {
//     try {
//       const res = await api().post(`/form`);
//       console.log(res.data);
//       // va a la pagina solo despues de haber creado un nuevo form
//       history.push('/createforms');
//     } catch (error) {
//       console.log('Error creating form:', error);
//     }
//   };