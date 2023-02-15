import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    title, // Заголовок поля
    name,
    options, // асинхронно полученные данные "qualities"
    onChange,
    defaultValue
}) => {
    // Так как "qualities" могут быть как массивом, так и объектом, нам требуется произвести некоторые манипуляции с данными,
    // чтобы привести данные к одному типу const options = [{ value: "...", label: "..." }, {}, {},...] в данном случае = "optionsArray"
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map(optionName => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options;

    // В данном случае обработчик onChange вызывает onChange(event) из RegisterForm, в котором
    // handleChange деструктуризирует "event" и с помощью "target" получает данные о имени поля
    // "event.target.name" и значении введенной в него информации "event.target.value" и далее
    // записывает эти данные в состояние переменной inputData = { {}, {}, ..., {[event.target.name]: event.target.value}}
    // Для парметра "qualities" это значение - массив из объектов с данными качеств qualities: [{}, {}, ...]
    // Такой же обработчик реализуем и в других компонентах форм.
    const handleChange = (value) => {
        onChange({ name: name, value });
        // name получаем из параметров, а value из "handleChange" в родительском компоненте "RegisterForm"
    };

    return (
        <div className="mb-4">
            <label className="form-label">
                {title}
            </label>
            <Select
                isMulti // Множественный селект
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue = {defaultValue}
                closeMenuOnSelect={false} // позволяет не закрывать выпадающий список после выбора одного из пунктов
                options={optionsArray} // По инструкции к библиотеке "react-select" options - массив из объектов. const options = [{ value: "...", label: "..." }, {}, {},...]
                // а получаем мы объект с объектами, поэтому его нужно трансформировать. Для этого используем новый компонент
                onChange = {handleChange}
                name = {name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    title: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
