import React from "react";
import PropTypes from "prop-types";

export const BookMark = ({ status, ...rest }) => {
    return (
        <h3 {...rest}>
            <i className={"bi bi-person" + (status === true ? "-check-fill" : "")}></i>
        </h3>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};
