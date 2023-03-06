// import React from "react";
import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";
import api from "../../../api";

const QualitiesCard = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <Qualities qualities={user.qualities} />
                    </p>
                </div>
            </div>
        );
    };
};

QualitiesCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default QualitiesCard;
