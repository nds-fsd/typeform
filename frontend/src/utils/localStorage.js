const getStorageObject = (key) => {
    const item = localStorage.getItem(key);
    if (item !== null) {
        return JSON.parse(item);
    } else {
        return null;
    }
};

const setStorageObject = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
};

const deleteStorageObject = (key) => {
    localStorage.removeItem(key);
};

const getUserToken = () => {
    const session = getStorageObject('user-storage');
    if (session) {
        return session.token;
    } else {
        return null;
    }
};

const getUserSession = () => {
    const session = getStorageObject('user-storage');
    if (session) {
        return session.user;
    } else {
        return null;
    }
};

const setUserSession = (data) => {
    setStorageObject('user-storage', data);
};

const removeUserSession = () => {
    deleteStorageObject('user-storage');
};

export { getUserToken, getUserSession, setUserSession, removeUserSession };
