import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import { Qualitie } from "./qualitie";
import Loading from "./loading";

const User = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

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
        return (<Loading />);
    };
};

User.propTypes = {
    userId: PropTypes.string.isReqired
};

export default User;
