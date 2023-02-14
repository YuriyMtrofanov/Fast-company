import React from "react";
import PropTypes from "prop-types";

const RadioField = ({
    options,
    name,
    onChange,
    value,
    title
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label
                className="form-label"
            >
                {title}
            </label>
            <div>
                {options.map(option => (
                    <div
                        key = {option.name + "" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className = "form-check-input"
                            type = "radio"
                            name = {name}
                            id = {option.name + "" + option.value}
                            checked = {option.value === value}
                            // Параметр "checked" - "Выбран" применяется в том случае, когда выбранный пункт соответствует пункту из списка полученных данных
                            value = {option.value}
                            onChange = {handleChange}
                        />
                        <label
                            className = "form-check-label"
                            htmlFor = {option.name + "" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string
};

export default RadioField;
