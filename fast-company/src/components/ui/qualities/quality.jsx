import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
    const getQualityClasses = () => {
        let classes = "badge m-1 badge bg-";
        classes += color;
        return classes;
    };

    return <span className={getQualityClasses()}>{name}</span>;
};

Qualitie.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Qualitie;
