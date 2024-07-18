
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getUserToken, getUserSession, setUserSession, removeUserSession } from '../utils/localStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  useEffect(() => {
    const session = getUserSession();
    console.log('Session on mount:', session);
    if (session) {
      setUserId(session.id);
      setUserName(session.name);
      setUserEmail(session.email);
    }
  }, []);

  const setUserInContext = () => {
    const session = getUserSession();
    if (session) {
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

// import { createContext, useContext, useEffect, useState } from 'react';
// import { getUserSession } from '../utils/localStorage';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const session = getUserSession();
//     console.log('Session on mount:', session);
//     if (session) {
//       setUserId(session.id);
//       setUserName(session.name);
//       setUserEmail(session.email);
//     }
//   }, []);

//   const setUserInContext = () => {
//     const session = getUserSession();
//     if (session) {
//       setUserId(session.id);
//       setUserName(session.name);
//       setUserEmail(session.email);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ userId, userEmail, userName, setUserInContext }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserProvider = () => useContext(UserContext);