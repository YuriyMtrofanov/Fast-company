import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import { Qualitie } from "./qualitie";

const User = () => {
    const { userId } = useParams();
    // userId = "67rdca3eeb7f6fgeed47181f" или "67rdca3eeb7f6fgeed471817"
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
