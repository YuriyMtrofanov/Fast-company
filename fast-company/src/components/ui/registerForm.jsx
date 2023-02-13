import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import api from "../../api";

const RegisterForm = () => {
    // Задаем состояние для всей формы сразу (Информация, вводимая в полях ввода). Для каждого поля добавляем
    // свой собственный параметр
    const [inputData, setInputData] = useState({ email: "", password: "", profession: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => { // Создаем обработчик, фиксирующий изменения вводимой информации
        // console.log("name: ", event.target.name, "value: ", event.target.value);
        setInputData(prevState => (
            { ...prevState, [event.target.name]: event.target.value }
        ));
    };

    // Для реализации выпадающего  списка профессий трелбуется для начала получить эти профессии
    const [professions, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
    }, []);

    // Файл конфигурации (настроек полей) для валидации форм
    const validationConfig = {
        email: {
            isRequired: {
                message: `Поле Email обязательно к заполнению`
            },
            isEmail: {
                message: `Email введен некорректно`
            }
        },
        password: {
            isRequired: {
                message: `Поле Password обязательно к заполнению`
            },
            isCapitalSymbol: {
                message: `Password должен содержать заглавные буквы`
            },
            isConteinDigit: {
                message: `Password должен содержать цифры`
            },
            min: {
                message: `Password должен содержать минимум из восьми символов`,
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: `Выберите вашу профессию *Обязательно для заполнения)`
            }
        }
    };

    const validate = () => {
        const errors = validator(inputData, validationConfig);
        // Нам больше не нужно валидировать вручную поэтому код ниже удаляем
        // for (const fieldName in inputData) {
        //     if (inputData[fieldName].trim() === "") {
        //         errors[fieldName] = `Поле ${fieldName} дложно быль заполнено`;
        //     }
        // }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [inputData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(inputData); // т.о. если валидация не увенчалась успехом, то console.log блокируется и информация не выводится в консоль
    };

    // Переменная для управления кнопкой "Submit". Она принимается в себя условие проверки наличия ошибок в
    // объекте с ошибками "errors = {}". Если нет записей, значит нет и ключей к записям, значит длина массива
    // в ключами = 0.
    const isAbled = Object.keys(errors).length === 0;
    // console.log(isAbled);

    return (
        <form onSubmit = { handleSubmit }>
            {/* <div>
                <label htmlFor="email">Email</label>{" "}
                <input
                    type="text"     // или "password"
                    id="email"      // или "password"
                    name="email"    // или "password"
                    value={inputData.email} // inputData - объект с ключами email и password (event.target.name). По данным ключам хранятся данные "event.target.value"
                    onChange={handleChange}
                />
            </div> */}
            <TextField
                title = "Email"
                type = "text"
                name = "email"
                value = {inputData.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                title = "Password"
                type = "password"
                name = "password"
                value = {inputData.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <SelectField
                title = "Веберите вашу профессию" // Название поля
                value = {inputData.profession} // inputData.profession
                onChange = {handleChange} // handleChange
                defaultOption = "Выберите..."
                options = {professions} // Через этот параметр получаем профессии
                error = {errors.profession}// метод для ренедринга ошибки
            />
            <button
                type="submit"
                disabled = {!isAbled} // Кнопка активна при отсутствии ошибок т.е. если isDisabled не существует
                className = "btn btn-primary w-100 mx-auto"
            >Submit</button>
        </form>
    );
};

export default RegisterForm;
