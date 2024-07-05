
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getUserToken, getUserSession, setUserSession, removeUserSession } from '../utils/localStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(getUserSession()?.id);
  const [userEmail, setUserEmail] = useState(getUserSession()?.email);
  const [userName, setUserName] = useState(getUserSession()?.name);

  console.log(userId, 'desde context')
  // () => setUserId(getUserSession().id);
  // setUserName(getUserSession().name);
  // setUserEmail(getUserSession().email);

  // const currentUserId = getUserSession().id;
  // useEffect(() => {
  //   const session = getUserSession();
  //   if (session) {
  //     setUserId(session.id);
  //     setUserName(session.name);
  //     setUserEmail(session.email);
  //     console.log('userId', userId, userName, userEmail)
  //   }
  // }, []);
  // console.log(userId, userEmail, userName);

  const setUserInContext = () => {
    const session = getUserSession();
    if (session) {
      console.log('setting user in context afte rlogin/signup')
      setUserId(session.id);
      setUserName(session.name);
      setUserEmail(session.email);
      console.log('userId', userId, userName, userEmail)
    }
  };

  return (
    <UserContext.Provider value={{ userId, userEmail, userName, setUserInContext }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserProvider = () => useContext(UserContext);