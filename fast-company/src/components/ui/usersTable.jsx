import React from "react";
import PropTypes from "prop-types";
import { BookMark } from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table, { TableHeader, TableBody } from "../common/table";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onBookMark,
    onDelete
}) => {
    const columns = {
        name: {
            iter: "name",
            name: "Имя"
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList {...{ qualities: user.qualities }} />
            )
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id = {user.profession}/>
        },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            iter: "rate",
            name: "Оценка"
        },
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

export default UsersTable;
