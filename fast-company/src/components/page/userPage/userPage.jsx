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
    // Переменная содержащая в себе состояние просмотра или редактирования страницы
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(data);
        });
    }, []);

    const handleChange = () => {
        history.push(`/users/${userId}/edit`);
        setEdit(prevState => !prevState);
    };

    if (user) {
        return (
            <>
                {edit === false
                    ? <div>
                        <h1> {user.name} </h1>
                        <h2> Профессия: {user.profession.name} </h2>
                        {user.qualities.map(qualitie => {
                            return (<Qualitie key = { qualitie._id } { ...qualitie } />);
                        })}
                        <h5> Встретился, раз: {user.completedMeetings} </h5>
                        <h2>Оценка: {user.rate}</h2>
                        <button onClick = {() => handleChange()}> Изменить </button>
                    </div>
                    : <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditPage
                                    id = {userId}
                                    name = {user.name}
                                    email = {user.email}
                                    gender = {user.sex}
                                    profession = {user.profession}
                                    qualities = {user.qualities}
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
