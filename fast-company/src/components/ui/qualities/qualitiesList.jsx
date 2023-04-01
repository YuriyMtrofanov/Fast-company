import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => { // usersTable => qualities: user.qualities = [id, id, id...]
    // Раньше в этот компонент передавались объекты с качествами, а сейчас массив с id для этих качеств.
    // Поэтому с помощью getQuality() я перебираю эти id-шники и по ним получаю массив объектов с качествами (userQualities),
    // Данный массив я перебираю методом map() и накаждой итерации возвращаю <Quality />
    const { isLoading, getQuality } = useQuality();
    const userQualities = getQuality(qualities);
    return (
        <>
            {!isLoading
                ? userQualities.map((quality) => (
                    <Quality key = { quality._id } { ...quality } />
                ))
                : ("Loading...")
            }
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
