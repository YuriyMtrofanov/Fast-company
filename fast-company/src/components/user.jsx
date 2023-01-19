import React from "react";
import { Qualitie } from "./qualitie";
import { BookMark } from "./bookmark";
import PropTypes from "prop-types";

export const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onBookMark,
    bookmark,
    onDelete
}) => {
    return (
        <tr>
            <td> {name} </td>
            <td>
                {qualities.map((qualitie) => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td> {profession.name} </td>
            <td> {completedMeetings} </td>
            <td> {rate} /5</td>
            <td>
                <BookMark
                    // { ...{ _id, bookmark, onBookMark }}
                    status = { bookmark }
                    onClick={() => onBookMark(_id)}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object),
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onBookMark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
};
