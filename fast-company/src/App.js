import React, { useState, useEffect } from "react";
import { Users } from "./components/users.jsx";
import api from "./api";

export function App() {
    const [usersList, setUsersList] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => {
            setUsersList(data);
        });
    }, []);

    const handleBoookMark = (userId) => {
        const usersListBM = usersList.map((user) => {
            if (user._id === userId) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsersList(usersListBM);
    };

    const handleDelete = (userId) => {
        const currentUsersList = usersList.filter(
            (user) => user._id !== userId
        );
        setUsersList(currentUsersList);
    };

    return (
        <>
            {usersList && // Так как запрос данных асинхронный, то при вызове компонента
            // сначала нужно проверить а есть ли данные для рендеринга компонента
                <Users
                    users = { usersList } // передаю данные по всем юзерам
                    onDelete = { handleDelete }
                    onBookMark = { handleBoookMark }
                />
            }

        </>
    );
};
