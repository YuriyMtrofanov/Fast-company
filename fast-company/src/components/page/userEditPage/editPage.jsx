import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import api from "../../../api";

const EditPage = ({ id }) => {
    // const [userData, setUserData] = useState({
    //     name: "",
    //     email: "",
    //     profession: {},
    //     qualities: [],
    //     sex: "male"
    // });
    const [userData, setUserData] = useState({
        // _id: "",
        // name: "",
        // email: "",
        // sex: "male",
        // profession: "",
        // qualities: "",
        // completedMeetings: "",
        // rate: "",
        // bookmark: false
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.users.getById(id).then(data => {
            // const newQualities = Object.keys(data.qualities).map((optionName) => ({
            //     value: data.qualities[optionName]._id,
            //     label: data.qualities[optionName].name,
            //     color: data.qualities[optionName].color
            // }));
            const newData = {
                _id: data._id,
                name: data.name,
                email: data.email,
                sex: data.sex,
                profession: data.profession._id,
                // qualities: newQualities,
                qualities: data.qualitie,
                completedMeetings: data.completedMeetings,
                rate: data.rate,
                bookmark: data.bookmark
            };
            // console.log("newQualities", newQualities);
            setUserData(newData);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
            console.log("qualitiesList", qualitiesList);
        });
    }, []);

    // Для проверки данных
    useEffect(() => {
        // console.log("userData.qualities", userData.qualities);
    });

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/users/${id}/`);
        // const localInfo = JSON.parse(localStorage.getItem("users")).find(
        //     (user) => user._id === id
        // );
        console.log("отправка данных",
            { ...userData }
            // localInfo,
            // Object.keys(userData).map(key => localInfo[key])
        );

        // const { profession } = userData;
        // console.log("profession", profession);
    };
    if (userData.name) {
        return (
            <>
                <h3 className="mb-4">Редактировать профиль</h3>
                <form onSubmit = { handleSubmit }>
                    <TextField
                        label = "Имя"
                        type = "text"
                        name = "name"
                        value = { userData.name }
                        onChange = { handleChange }
                    />
                    <TextField
                        label = "Электронная почта"
                        type = "text"
                        name = "email"
                        value = { userData.email }
                        onChange = { handleChange }
                    />
                    <SelectField
                        label = "Выбери свою профессию"
                        name = "profession"
                        options = { professions }
                        defaultOption = "Выберете..."
                        value = { userData.profession } // Значение по умолчанию
                        onChange = { handleChange }
                    />
                    <RadioField
                        label = "Выберите ваш пол"
                        type = "radio"
                        name = "sex"
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value = { userData.sex }
                        onChange = { handleChange }
                    />
                    <MultiSelectField
                        label = "Выберите ваши качества"
                        name = "qualities"
                        options = { qualities }
                        onChange = { handleChange }
                        defaultOption = { userData.qualities }
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </>
        );
    } else {
        return (<h1>Loading...</h1>);
    };
};

EditPage.propTypes = {
    id: PropTypes.string
};

export default EditPage;
