import React from "react";
import PropTypes from "prop-types";

const TextField = ({
    title,
    type,
    name,
    value,
    onChange,
    error
}) => {
    return (
        <div>
            <label htmlFor={name}>{ title }</label>{" "}
            <input
                type = {type}
                id = {name}
                name = {name}
                value = {value} // Ключ к обоъекту с вводимыми данными "inputData.email" ("event.target.name):  "event.target.value"
                onChange = {onChange}
            />
            {error &&
                <p>{error}</p>}
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
