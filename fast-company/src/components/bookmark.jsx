import React from "react";
import PropTypes from "prop-types";

export const BookMark = ({ bookmark }) => {
    const addBookMark = () => {
        return bookmark === true
            ? (<i className="bi bi-person-check-fill"></i>)
            : (<i className="bi bi-person"></i>);
    };
    return <h3>{addBookMark()}</h3>;
};

BookMark.propTypes = {
    bookmark: PropTypes.bool.isRequired
};
