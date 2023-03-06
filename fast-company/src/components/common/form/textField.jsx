import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState();

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const changeShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{ label }</label>
            <div className="input-group has-validation">
                <input
                    type = {showPassword ? "text" : type} // Если showPassword = true, то type="text" если false, то type = параметру, передаваемому с props
                    id = {name}
                    name = {name}
                    value = {value} // Ключ к обоъекту с вводимыми данными "inputData.email" ("event.target.name):  "event.target.value"
                    onChange = {handleChange}
                    className = {getInputClasses()}
                    // className = "form-control is-invalid"
                    placeholder = {placeholder === "Search" ? "Search" : ""}
                />
                {type === "password" && ( // кнопка отобразается только если передаваемый с props атрибут type равен "password"
                    <button
                        className ="btn btn-outline-secondary"
                        type = "button"
                        onClick = {changeShowPassword}
                    >
                        <i className = {"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
                    </button>
                )}
                {error &&
                    <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextField;
