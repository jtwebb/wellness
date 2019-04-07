export const localStorageKey = '_jtwebb_wellness';

export const getData = () => {
    try {
        return JSON.parse(localStorage.getItem(localStorageKey));
    } catch (e) {
        console.error(e);
        return {};
    }
};

export const saveData = (data) => {
    try {
        return localStorage.setItem(localStorageKey, JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
};

export const saveItem = ({key, value}) => {
    try {
        const data = JSON.parse(localStorage.getItem(localStorageKey));
        data[key] = value;
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
};

export const deleteData = () => {
    return localStorage.removeItem(localStorageKey);
};
