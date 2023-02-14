import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
// import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    // Задаем состояние для всей страницы т.е. объект, в котором будут храниться все формы сразу
    // (Информация, вводимая в полях ввода). Для каждого поля добавляем свой собственный параметр
    const [inputData, setInputData] = useState(
        {
            email: "", // Значение по умолчанию для "email"
            password: "", // Значение по умолчанию для "password"
            profession: "", // Значение по умолчанию для "profession"
            sex: "male", // Значение по умолчанию для "sex"
            qualities: [] // Значение для поля качеств
        }
    );
    // Создаем обработчик, фиксирующий изменения вводимой информации в поле ввода. Мы можем его использовать для
    // различных форм т.к. функционал идентичен вне зависимости от типа формы. Данная функция вызывается каждый раз
    // когда в поле ввода ноявляется информация, и затем обновляется состояние переменной "inputData"
    const handleChange = (target) => {
        // console.log("target: ", target); // здесь мы получим undefined
        // if (target) {
        setInputData((prevState) => ({
            // Как видно в данной форме ключ объе   кта задается динамически, в зависимости от выбранного поля
            // event позволяет отследить событие в выбранном поле и получить данные этого поля через "target"
            ...prevState,
            [target.name]: target.value
        }));
        // }
    };

    // Для реализации выпадающего  списка профессий трелбуется для начала получить "professions" или "qualities"
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.professions.fetchAll().then(data => // асинхронный запрос профессий
            setProfessions(data)
        );
        api.qualities.fetchAll().then(data => // асинхронный запрос качеств
            setQualities(data)
        );
    }, []);

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
            <RadioField
                options = {[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name = "sex"
                onChange = {handleChange}
                value = {inputData.sex}
                title = "Выберите ваш пол"
            />
            <MultiSelectField
                name = "qualities"
                options = {qualities}
                onChange = {handleChange}
                title = "Выберите ваши качества"
            />
            {/* <CheckBoxField /> */}
            <button
                type="submit"
                disabled = {!isAbled} // Кнопка активна при отсутствии ошибок т.е. если isDisabled не существует
                className = "btn btn-primary w-100 mx-auto"
            >Submit</button>
        </form>
    );
};

export default RegisterForm;
