import React, { useState } from "react";
import { Users } from "./components/users.jsx";
import { SearchStatus } from "./components/searchStatus.jsx";
import api from "./api";

export function App() {
    const [usersList, setUsersList] = useState(api.users.fetchAll());

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
            <h1>
                <SearchStatus length={usersList.length} />
            </h1>
            <Users
                users={usersList} // передаю данные по всем юзерам
                onDelete={handleDelete}
                onBookMark={handleBoookMark}
            />
        </>
    );
}
