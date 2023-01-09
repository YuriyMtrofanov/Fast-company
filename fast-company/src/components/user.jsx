import React from "react";
import { Qualitie } from "./qualitie";
import { BookMark } from "./bookmark";
import "bootstrap/dist/css/bootstrap.css";

export const User = (user) => {
    return (
        <tr>
            <td> {user.name} </td>
            <td>
                {user.qualities.map((qualitie) => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td> {user.profession.name} </td>
            <td> {user.completedMeetings} </td>
            <td> {user.rate} /5</td>
            <td>
                <span
                    className="btn btn-light btn-sm"
                    onClick={() => user.onBookMark(user._id)}
                >
                    {<BookMark bookmark={user.bookmark} />}
                </span>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => user.onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
