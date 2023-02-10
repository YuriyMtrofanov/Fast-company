import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [inputData, setInputData] = useState({ email: "", password: "" }); // Задаем состояние для всей формы сразу (Информация, вводимая в полях ввода).

    const handleChange = (event) => { // Создаем обработчик, фиксирующий изменения вводимой информации
        // console.log("name: ", event.target.name, "value: ", event.target.value);
        setInputData(prevState => (
            { ...prevState, [event.target.name]: event.target.value }
        ));
    };

    const [errors, setErrors] = useState({});

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
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                        <button
                            type="submit"
                            disabled = {!isAbled} // Кнопка активна при отсутствии ошибок т.е. если isDisabled не существует
                            className = "btn btn-primary w-100 mx-auto"
                        >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
