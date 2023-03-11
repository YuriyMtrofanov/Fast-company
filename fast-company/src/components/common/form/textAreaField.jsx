import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    type,
    name,
    value,
    onChange,
    rows
    // error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label
                htmlFor = "content"
                className = "form-label"
            >Сообщение</label>
            <textarea
                type = {type}
                className="form-control"
                id = {name}
                name = {name}
                value = {value}
                rows={rows}
                onChange = {handleChange}
            ></textarea>
        </div>
    );
};

TextAreaField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.string
};

export default TextAreaField;
