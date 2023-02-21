import React from "react";
import PropTypes from "prop-types";

export const UpDownIcon = (selectedSort) => {
    return (
        <i
            className={"bi bi-caret" + (selectedSort.order === "asc" ? "-up-fill" : "-down-fill")}
        ></i>
    );
};

UpDownIcon.propTypes = {
    selectedSort: PropTypes.object
};
