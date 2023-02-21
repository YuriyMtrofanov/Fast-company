import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualities/qualitie";
import Loading from "../../ui/loading";
import EditPage from "../userEditPage";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "edit" ? type : "user");

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(data);
        });
    }, [formType]);

    const changeFormType = () => {
        setFormType(prevState => prevState === "edit" ? "user" : "edit");
        history.push(`/users/${userId}/edit`);
        // Либо вот такое решение. Тоже работает
        // if (formType === "user") {
        //     history.push(`/users/${userId}/edit`);
        // } else {
        //     history.push(`/users/${userId}`);
        // }
    };

    if (user) {
        return (
            <>
                {formType === "user"
                    ? <div>
                        <h1> {user.name} </h1>
                        <h2> Профессия: {user.profession.name} </h2>
                        {user.qualities.map(qualitie => {
                            return (<Qualitie key = { qualitie._id } { ...qualitie } />);
                        })}
                        <h5> Встретился, раз: {user.completedMeetings} </h5>
                        <h2>Оценка: {user.rate}</h2>
                        <button onClick = {() => changeFormType()}> Изменить </button>
                    </div>
                    : <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditPage
                                    id = {userId}
                                    onChange = {changeFormType}
                                />
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    } else {
        return (<Loading />);
    };
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
