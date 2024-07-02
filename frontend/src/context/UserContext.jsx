
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getUserToken, getUserSession } from '../utils/localStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState(getUserSession().id);
  const [userEmail, setUserEmail] = useState(getUserSession().email);
  const [userName, setUserName] = useState(getUserSession().name);

  // () => setUserId(getUserSession().id);
  // setUserName(getUserSession().name);
  // setUserEmail(getUserSession().email);

  // const currentUserId = getUserSession().id;

  // console.log(userId, userEmail, userName, userData);

  return (
    <UserContext.Provider value={{ userId, userEmail, userName }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserProvider = () => useContext(UserContext);