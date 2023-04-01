import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function errorCatcher(error) { // Функция-обработчик ошибок
        const { message } = error.response.data;
        setError(message);
    };

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function getProfession(id) { // Данный id = user.profession
        return professions.find(profession => profession._id === id);
    };

    useEffect(() => { // Вызаваем запрос данных по всем профессиям
        getProfessionsList();
        // console.log("professions", professions);
    }, []);

    useEffect(() => { // Отрабатываем ошибки приполучении записи в error
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <ProfessionContext.Provider
            value = {{ professions, isLoading, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
