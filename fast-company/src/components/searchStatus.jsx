import React from "react";
import PropTypes from "prop-types";

export const SearchStatus = (props) => {
    const { length } = props;
    if (length > 4) {
        return (
            <span className="badge bg-primary">
                {length} человек тусанет с тобой сегодня
            </span>
        );
    } else if (length <= 4 && length > 1) {
        return (
            <span className="badge bg-primary">
                {length} человека тусанут с тобой сегодня
            </span>
        );
    } else if (length === 1) {
        return (
            <span className="badge bg-primary">
                {length} человек тусанет с тобой сегодня
            </span>
        );
    } else {
        return (
            <span className="badge bg-danger"> Никто с тобой не тусанет </span>
        );
    }
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
