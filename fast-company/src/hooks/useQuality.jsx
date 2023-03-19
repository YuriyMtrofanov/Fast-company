import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function getQuality(qualitiesArray) { // qualitiesArray = Array: user.quality = [q1._id, q2._id, q3._id,... ]
        return qualitiesArray.map((id) => {
            return qualities.find(quality => quality._id === id);
        });
    };

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualityContext.Provider
            value = {{ qualities, isLoading, getQuality }}
        >
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
