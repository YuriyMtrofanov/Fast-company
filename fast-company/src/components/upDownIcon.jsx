import React from "react";
import PropTypes from "prop-types";

export const UpDownIcon = (selectedSort) => {
    return (
        <i
            className={"bi bi-caret" + (selectedSort.order === "asc" ? "-up-fill" : "-down-fill")}
        ></i>
    );
    // Аналогичная, но развернутая запись:
    // if (columns.iter) {
    // return (selectedSort.order === "asc"
    //     ? <i className="bi bi-caret-up-fill"></i>
    //     : <i className="bi bi-caret-down-fill"></i>);
    // };
};

UpDownIcon.propTypes = {
    selectedSort: PropTypes.object
};
