import React from "react";
import PropTypes from "prop-types";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import { BookMark } from "./bookmark";
import { QualitiesList } from "./qualitiesList";
import { Table } from "./table";

export const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onBookMark,
    onDelete
}) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList {...{ qualities: user.qualities }} />
            )
        },
        profession: { iter: "profession.name", name: "Профессия" },
        completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: {
            iter: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status = { user.bookmark }
                    onClick = {() => onBookMark(user._id)}
                    {...{ role: "button" }}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <Table>
            <TableHeader { ...{ onSort, selectedSort, columns }}/>
            <TableBody { ...{ data: users, columns } }/>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
