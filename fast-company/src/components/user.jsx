import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import { Qualitie } from "./qualitie";

// 1. Привязать ссылку к имени пользователя на общей странице. Компонент Link добавит обработчик
// событий, который позволит получать id пользователя, формировать ссылку и переходить на персональную
// пользователя.

// 2 Реализовать переадресацию в случае ввода некорректной ссылки. Выполнить проверку на существование
// запрашиваемого id.

const User = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    console.log("user", user);
    console.log("user id", typeof userId);

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(data);
        });
    }, []);

    const handleSave = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <h1> {user.name} </h1>
                <h2> Профессия: {user.profession.name} </h2>
                {user.qualities.map(qualitie => {
                    return (<Qualitie key = { qualitie._id } { ...qualitie } />);
                })}
                <h5> Встретился, раз: {user.completedMeetings} </h5>
                <h2>Оценка: {user.rate}</h2>
                <button onClick = {() => handleSave()}> Все пользователи </button>
            </>
        );
    } else {
        return ("Loading...");
    };
};

export default User;
