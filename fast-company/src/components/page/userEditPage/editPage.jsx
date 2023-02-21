import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
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
        sex: "male",
        profession: "",
        qualities: [],
        completedMeetings: "",
        rate: "",
        bookmark: ""
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        // Данные качества отправляются на отрисовску списка качеств.
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            // JSON.parse(JSON.stringify(qualitiesList));
            setQualities(qualitiesList);
        });
        api.users.getById(id).then(data => {
            // Так как качества подтягиваются из api, то по ключу qualities получаем объект
            // {_id: '', name: '', color: ''}, а для решения нужны {value: '', label: '', color: ''}
            const newQualities = Object.keys(data.qualities).map((optionName) => ({
                value: data.qualities[optionName]._id,
                label: data.qualities[optionName].name,
                color: data.qualities[optionName].color
            }));
            const newData = {
                name: data.name,
                email: data.email,
                sex: data.sex,
                profession: data.profession._id,
                qualities: newQualities,
                completedMeetings: data.completedMeetings,
                rate: data.rate,
                bookmark: data.bookmark
            };
            setUserData(newData);
        });
    }, []);

    const handleChange = (target) => {
        // console.log("target", { [target.name]: target.value });
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // Данный метод позволяет получить объект профессии по её id. Это понадобится для
    // обртного преобразования данных к исходному виду, который записан в user
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    // Данный метод позволяет получить объект профессии по её id. Это понадобится для
    // обртного преобразования данных к исходному виду, который записан в user
    // с ключами {_id: '', name: '', color: ''}
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        // const { profession, qualities } = userData;
        // Записываем изменения в промежуточную переменную для дальнейшего экспорта в localStorage
        // const exportData = {
        //     ...userData,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // };
        // api.users.update(id, data).then();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // history.push(`/users/${id}/`);
        // Записываем изменения в промежуточную переменную для дальнейшего экспорта в localStorage
        const { profession, qualities } = userData;
        const exportData = {
            ...userData,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        console.log(exportData);
        api.users.update(id, exportData).then();
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
                        defaultValue = { userData.qualities }
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
