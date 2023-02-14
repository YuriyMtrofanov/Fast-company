import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    // Все пропсы и PropTypes идентичны тем, что мы задали в "TextField" кроме "defaultOption"
    title, // Заголовок поля
    value, // inputData.profession
    onChange, // handleChange
    defaultOption, // значение отображаемое в поле ввода по умолчанию
    options, // Через этот параметр получаем профессии
    error // метод для ренедринга ошибки
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    // Метод для динамического рендеринга класса для тега <div>, отвечающего за отображения ошибки
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    // Если получаемые данные - объект, то пробегаемся по ключам и записываем полученные данные в переменную "optionsArray"
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => ({
            name: options[optionName].name,
            value: options[optionName]._id
        }))
        : options;
    // let optionsArray = [];
    // if (!Array.isArray(options) && typeof options === "object") {
    //     optionsArray = Object.keys(options).map(key => ({
    //         name: options[key].key,
    //         _id: options[key]._id
    //     })); // Либо это будет "optionsArray"
    // } else {
    //     optionsArray = options; // Либо это "optionsArray"
    // };

    return (
        <div className="mb-4">
            <label
                htmlFor="validationCustom04"
                className="form-label"
            >
                {title}
            </label>
            <select
                // className = "form-select"
                className= {getInputClasses()} // название класса динамически рендерится при помощи функции "getInputClasses"
                id = "validationCustom04"
                name = "profession"
                value = {value} // inputData.profession
                onChange = {handleChange} // handleChange
                // required  - этот атрибут удаляем
            >
                {/* На этом этапе какая-то ошибка Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>. */}
                <option
                    disabled // данное пооле неактивно
                    value=""
                >
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map(option => (
                        <option
                            // selected = {profession._id === inputData.profession} // Если выбранная профессия равна значению профессии из полученных данных,
                            // то активируется аттрибут "selected" и выбранная профессия отображается в поле выбора профессий
                            value={option.value}
                            key = {option.value}
                        >
                            {option.name}
                        </option>
                    ))}
                {/* {options && // Так как профессии получаем асинхронно, то перед рендерингом нужно проверить получины ли данные
                        // Если получаем массив
                        options.map(profession => (
                            <option
                                // selected = {profession._id === inputData.profession} // Если выбранная профессия равна значению профессии из полученных данных,
                                // то активируется аттрибут "selected" и выбранная профессия отображается в поле выбора профессий
                                key = {profession._id}
                                value={profession._id}
                            >
                                {profession.name}
                            </option>

                        // Если получаем объект, то такая конструкция
                        Object.keys(options).map(key => (
                            <option
                                selected = {profession[key]._id === inputData.profession} // Если выбранная профессия равна значению профессии из полученных данных,
                                // то активируется аттрибут "selected" и выбранная профессия отображается в поле выбора профессий
                                key = {profession[key]._id}
                                value={profession[key]._id}
                            >
                                {profession[key].name}
                        </option>
                        ))
                } */}
            </select>
            {error && // Если ошибка существует, то мы её отобразаем
                <div
                    className="invalid-feedback"
                >
                    {error}
                </div>
            }
        </div>
    );
};

SelectField.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
