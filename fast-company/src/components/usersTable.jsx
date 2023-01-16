import React from "react";
import PropTypes from "prop-types";
import { User } from "./user";

export const UsersTable = ({ users, onSort, ...rest }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th onClick = {() => { onSort("name"); }} scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th onClick = {() => { onSort("profession.name"); }} scope="col">Профессия</th>
                    <th onClick = {() => { onSort("completedMeetings"); }}scope="col">Встретился, раз</th>
                    <th onClick = {() => { onSort("rate"); }} scope="col">Оценка</th>
                    <th onClick = {() => { onSort("bookmark"); }} scope="col">Закладки</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        {...user}
                        {...rest}
                    />
                ))}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};
