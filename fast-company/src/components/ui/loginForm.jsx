import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    // console.log(process.env);
    const [inputData, setInputData] = useState({ email: "", password: "", stayOn: false }); // Задаем состояние для всей формы сразу (Информация, вводимая в полях ввода).
    const { signIn } = useAuth();
    const history = useHistory();

    const handleChange = (target) => {
        setInputData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const [errors, setErrors] = useState({});

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
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [inputData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signIn(inputData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    const isAbled = Object.keys(errors).length === 0;

    return (
        <form onSubmit = { handleSubmit }>
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
            <CheckBoxField
                name = "stayOn"
                value = {inputData.stayOn}
                onChange = {handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled = {!isAbled}
                className = "btn btn-primary w-100 mx-auto"
            >Submit</button>
        </form>
    );
};

export default LoginForm;
