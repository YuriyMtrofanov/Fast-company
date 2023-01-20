import React from "react";
import { Qualitie } from "./qualitie";
import PropTypes from "prop-types";

export const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualitie) => (
                <Qualitie key = { qualitie._id } { ...qualitie } />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
