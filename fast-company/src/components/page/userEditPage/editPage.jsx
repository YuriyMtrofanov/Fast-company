import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import api from "../../../api";

const EditPage = ({ id }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profession: {},
        qualities: [],
        sex: "male"
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    useEffect(() => {
        api.users.getById(id).then(data => {
            const newData = {
                name: data.name,
                email: data.email,
                profession: data.profession,
                qualities: data.qualities,
                sex: data.sex
            };
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
        });
    }, []);

    // Для проверки данных
    useEffect(() => {
        console.log("professions", professions);
    });

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        // const { profession, qualities } = data;
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });
    };

    if (userData.qualities.length > 0) {
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
                        defaultOption="Выберите..."
                        value = { userData.profession.label }
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
                        defaultValue = { userData.qualities.label }
                    />
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
