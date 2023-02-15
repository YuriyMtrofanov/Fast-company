import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({
    name,
    value, // true / false (выбран или не выбран)
    onChange,
    children,
    error
}) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange = {handleChange}
                checked = {value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            <div>
                {error && <div className="feedback">{error}</div>}
            </div>
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]), // PropTypes.node - просто элемент Реакт
    error: PropTypes.string
};

export default CheckBoxField;
