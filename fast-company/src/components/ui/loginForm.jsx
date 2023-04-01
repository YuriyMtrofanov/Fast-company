import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
// import * as yup from "yup"; // yup можно удалить командой "npm uninstall yup"

const LoginForm = () => {
    // console.log(process.env);
    const [inputData, setInputData] = useState({ email: "", password: "", stayOn: false }); // Задаем состояние для всей формы сразу (Информация, вводимая в полях ввода).
    const { signIn } = useAuth();

    const handleChange = (target) => {
        // console.log("target: ", target); // здесь мы получим undefined так как в этом компоненте мы получаем данные асинхронно
        // Поэтому мы получаем данные асинхронно в дочернем компоненте, возвращаем их в родительский с помощью "handleChange()" и
        // записываем их в переменную "target"
        // if (target) { // данная проверка больше не нужна так как мы прокидываем данные из дочернего компонента синхронно
        setInputData((prevState) => ({
            // Как видно в данной форме ключ объе   кта задается динамически, в зависимости от выбранного поля
            // event позволяет отследить событие в выбранном поле и получить данные этого поля через "target"
            ...prevState,
            [target.name]: target.value
        }));
        // }
    };

    const [errors, setErrors] = useState({});

    // Файл конфигурации (настроек полей) для валидации форм с помощью функии "validator()"
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

    /* Альтернаативный способ валидации полей с помощью библиотеки "yup"
    const validationScheme = yup.object().shape({
        // Проверка свойств полей идет в обратном порядке, поэтому поля указываем также  в обратном порядке
        password: yup
            .string()
            .required("Поле 'Пароль' обязательно к заполнению")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать заглавные буквы") // ?= (выполнить проверку) . (1 симфол) * (совпадение) [A-Z] (диапазон заглавных букв)
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать цифры") // ?= (выполнить проверку) . (1 симфол) * (совпадение) [0-9] (диапазон цифр)
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен один из спец символов (! @ # $ % ^ & *) ")
            .matches(
                /(?=.{8,})/,
                "Пароль должен содержать минимум из восьми символов"),
        email: yup
            .string()
            .required("Поле Email обязательно к заполнению")
            .email("Email введен некорректно")
    });
    */
    const validate = () => {
        /* Валидация с помощью "yup"
        // Так как валидация с помощью "yup" асинхронная, то нам требуется пользоваться асинхронными методами для обработки
        // Если в фаргументах функции помимо "inputData" указать параметр {abortEarly: false}, будут выведены все ошибки
        validationScheme.validate(inputData)
            .then(() => { setErrors({}); })
            .catch(error => { setErrors({ [error.path]: error.message }); }); // отрицптельный исход. На этом этапе "yup" выдаст ошибку
        */
        // Валидация с помощью функии "validator()"
        const errors = validator(inputData, validationConfig);
        setErrors(errors);
        // Нам больше не нужно валидировать вручную поэтому код ниже удаляем
        // for (const fieldName in inputData) {
        //     if (inputData[fieldName].trim() === "") {
        //         errors[fieldName] = `Поле ${fieldName} дложно быль заполнено`;
        //     }
        // }
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [inputData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // console.log("request data", inputData); // т.о. если валидация не увенчалась успехом, то console.log блокируется и информация не выводится в консоль
        try {
            await signIn(inputData);
        } catch (error) {
            setErrors(error);
        }
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
            <CheckBoxField
                name = "stayOn"
                value = {inputData.stayOn}
                onChange = {handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled = {!isAbled} // Кнопка активна при отсутствии ошибок т.е. если isDisabled не существует
                className = "btn btn-primary w-100 mx-auto"
            >Submit</button>
        </form>
    );
};

export default LoginForm;
