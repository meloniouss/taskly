import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
    Cookies.set(key, value, { expires: 2 }); // Example: cookie expires in 7 days
};

export const getCookie = (key: string) => {
    return Cookies.get(key);
};

export const removeCookie = (key: string) => {
    Cookies.remove(key);
};
