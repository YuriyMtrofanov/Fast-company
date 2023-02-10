import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    title,
    type,
    name,
    value,
    onChange,
    error
}) => {
    const [showPassword, setShowPassword] = useState();

    const changeShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{ title }</label>
            <div className="input-group">
                <input
                    type = {showPassword ? "text" : type} // Если showPassword = true, то type="text" если false, то type = параметру, передаваемому с props
                    id = {name}
                    name = {name}
                    value = {value} // Ключ к обоъекту с вводимыми данными "inputData.email" ("event.target.name):  "event.target.value"
                    onChange = {onChange}
                    className = {getInputClasses()}
                    // className = "form-control is-invalid"
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
            </div>
            {error &&
                <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextField.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
