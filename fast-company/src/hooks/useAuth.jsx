import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService, { setTokens } from "../services/localStorage.service";
import randomInt from "../utils/randomInt";

export const httpAuth = axios.create(
    // {
    //     baseURL: "https://identitytoolkit.googleapis.com/v1/",
    //     params: {
    //         key:  process.env.REACT_APP_FIREBASE_KEY
    //     }
    // }
);
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message); // метод сохранения ключей из localStorage.service
    };

    async function signUp({ email, password, ...rest }) {
        // const keyFirebasePrivate = "AIzaSyAwh-5xNiLcnlTQl7VwIfR08tnvf6K_PcU"; // [API_KEY]
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFirebasePrivate}`;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            // const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Email уже существует" };
                    throw errorObject;
                }
            }
            // мы моментально получаем данные о пользователе, поэтому контролировать isLoading не нужно
        }
    };

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
            // console.log(data); // Ответ с данными от сервера получаем
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователся с данным Email не существует" };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неверно указан пароль" };
                    throw errorObject;
                }
            }
            // а здесь получаем данные асинхронно, поэтому нужно получать isLoading до момента получения данных;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorageService.getAccesToken()) {
            getUserData();
        } else {
            // но пока мы ждем получения данных авторизации или их нет (неавторизованный пользователь)
            // нужно отобразить данные для неавторизованного пользователя
            setIsLoading(false);
        }
    }, []);

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
            console.log("user", content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {!isLoading
                ? children
                : "loading..."
            }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
