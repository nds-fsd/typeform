const getStorageObject = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

const setStorageObject = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
};

const deleteStorageObject = (key) => {
    localStorage.removeItem(key);
};

const getUserToken = () => {
    const session = getStorageObject('user-storage');
    return session ? session.token : null;
};

const getUserSession = () => {
    const session = getStorageObject('user-storage');
    console.log('Getting user session:', session);
    return session ? session.user : null;
};


const setUserSession = (data) => {
    console.log('Setting user session:', data);
    setStorageObject('user-storage', { user: data });
    console.log('User session set:', getStorageObject('user-storage'));
};

const removeUserSession = () => {
    deleteStorageObject('user-storage');
};

export { getUserToken, getUserSession, setUserSession, removeUserSession };
