import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
// import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
// import Loading from "../../ui/loading";

const UserEditPage = ({ id }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });

    const [professions, setProfession] = useState([]);
    // const [qualities, setQualities] = useState([]);
    // const sex = [
    //     { name: "Male", value: "male" },
    //     { name: "Female", value: "female" },
    //     { name: "Other", value: "other" }
    // ];
    // const history = useHistory();
    // console.log(id);
    // Прямой запрос качеств по api
    useEffect(() => {
        // console.log({ id, ...userData });
        api.users.getById(id).then(data => {
            setUserData(data);
            console.log("data", data);
            // const formsList = Object.keys(data).map((fieldName) => ({
            // name: data[fieldName].name
            // email: data[fieldName],
            // profession: data[fieldName],
            // sex: data[fieldName],
            // qualities: data[fieldName]
            // }));
            // console.log("formsList", formsList);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
            console.log("professionsList", professionsList);
        });
        // api.qualities.fetchAll().then((data) => {
        //     const qualitiesList = Object.keys(data).map((optionName) => ({
        //         value: data[optionName]._id,
        //         label: data[optionName].name,
        //         color: data[optionName].color
        //     }));
        //     setQualities(qualitiesList);
        // });
    }, []);

    // Таким образом я изменяю данные, но пока не понял как их записать в localStorage
    // useEffect(() => {
    //     // const data = JSON.stringify(userData);
    // }, []);

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // с помощью этого параметра можем перебрасывать на страницу пользователя при нажатии на кнопку "Сохранить",
        // но в текущей версии ссылка меняется, но переброс не происходит
        // history.push(`/users/${id}`);
        // console.log("data", userData);
    };

    if (userData) {
        return (
            <form onSubmit = { handleSubmit }>
                <TextField
                    label = "Ваше имя"
                    name = "name"
                    type = "text"
                    value = { userData.name }
                    onChange = { handleChange }
                />
                <TextField
                    label = "Email"
                    name = "email"
                    type = "text"
                    value = { userData.email }
                    onChange = { handleChange }
                />
                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Выберите..."
                    options={professions}
                    name="profession"
                    onChange={handleChange}
                    value={userData.profession}
                />
                {/* <RadioField
                    label = "Выберите ваш пол"
                    name = "sex"
                    value = {userData.sex}
                    onChange = {handleChange}
                    // options = {userData.sex}
                    defaultValue = {userData.sex}
                /> */}
                <button
                    type="submit"
                    // disabled = {!isAbled}
                    className = "btn btn-primary w-100 mx-auto"
                >
                    Сохранить
                </button>
            </form>
        );
    }
    // return (
    //     <>
    //         {userData &&
    //             // <h1>{ userData.name }</h1>
    //             <form onSubmit = { handleSubmit }>
    //                 <TextField
    //                     label = "Ваше имя"
    //                     name = "name"
    //                     type = "text"
    //                     // value = { userData.name }
    //                     onChange = { handleChange }
    //                 />
    //                 <button
    //                     type="submit"
    //                     // disabled = {!isAbled}
    //                     className = "btn btn-primary w-100 mx-auto"
    //                 >
    //                     Сохранить
    //                 </button>
    //             </form>
    //         }
    //     </>
    // <form onSubmit = { handleSubmit }>
    // <TextField
    //     label = "Ваше имя"
    //     name = "name"
    //     type = "text"
    //     value = {userData.name}
    //     onChange = {handleChange}
    // />
    //     <TextField
    //         label = "Email"
    //         name = "email"
    //         type = "text"
    //         value = {userData.email}
    //         onChange = {handleChange}
    //     />
    //     <MultiSelectField
    //         label = "Выберите ваши личные качества"
    //         name = "qualities"
    //         onChange = {handleChange}
    //         options = {qualities}
    //         defaultValue = {userData.qualities}
    //     />
    // </form>
    // );
};

UserEditPage.propTypes = {
    // user: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // userId: PropTypes.string
    id: PropTypes.string
    // name: PropTypes.string,
    // email: PropTypes.string,
    // gender: PropTypes.string
};

export default UserEditPage;
