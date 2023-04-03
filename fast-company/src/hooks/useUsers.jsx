import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function errorCatcher(error) { // Функция-обработчик ошибок
        const { message } = error.response.data;
        setError(message);
    };
    async function getUsers() { // Функция-запрос данных с сервера по всем юзерам
        try {
            const { content } = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => { // Вызаваем запрос данных по всем юзерам
        getUsers();
    }, []);

    useEffect(() => { // Отрабатываем ошибки приполучении записи в error
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <UserContext.Provider
            value = {{ users }}
        >
            {!isLoading
                ? children
                : "Loading..."
            }
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
