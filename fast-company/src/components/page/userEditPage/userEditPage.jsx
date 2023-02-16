import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";

const UserEditPage = ({ id, name, email, gender }) => {
    const [inputData, setInputData] = useState({
        name: `${name}`,
        email: `${email}`,
        professions: "",
        sex: `${gender}`,
        qualities: []
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const sex = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];
    const history = useHistory();

    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
        api.qualities.fetchAll().then(data =>
            setQualities(data)
        );
    }, []);

    const handleChange = (target) => {
        setInputData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // с помощью этого параметра можем перебрасывать на страницу пользователя при нажатии на кнопку "Сохранить",
        // но в текущей версии ссылка меняется, но переброс не происходит
        history.push(`/users/${id}`);
        console.log("data", inputData);
    };

    return (
        <form onSubmit = { handleSubmit }>
            <TextField
                title = "Ваше имя"
                name = "name"
                type = "text"
                value = {inputData.name}
                onChange = {handleChange}
            />
            <TextField
                title = "Email"
                name = "email"
                type = "text"
                value = {inputData.email}
                onChange = {handleChange}
            />
            <SelectField
                title = "Веберите вашу профессию"
                name = "professions"
                value = {inputData.profession}
                onChange = {handleChange}
                options = {professions}
                defaultOption = "Выберите..."
            />
            <RadioField
                title = "Выберите ваш пол"
                name = "sex"
                value = {inputData.sex}
                onChange = {handleChange}
                options = {sex}
                defaultValue = {gender}
            />
            <MultiSelectField
                title = "Выберите ваши личные качества"
                name = "qualities"
                onChange = {handleChange}
                options = {qualities}
                defaultValue = {inputData.qualities}
            />
            <button
                type="submit"
                // disabled = {!isAbled}
                className = "btn btn-primary w-100 mx-auto"
            >
                Сохранить
            </button>
        </form>
    );
};

UserEditPage.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string
};

export default UserEditPage;
