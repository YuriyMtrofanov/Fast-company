import React from "react";
import PropTypes from "prop-types";
// import { User } from "./user";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";

export const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качества" },
        profession: { iter: "profession.name", name: "Профессия" },
        comletedMeetings: { iter: "comletedMeetings", name: "Встретился, раз" },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    return (
        <table className="table table-striped">
            <TableHeader { ...{ onSort, selectedSort, columns }}/>
            <TableBody { ...{ data: users, columns } }/>
            {/* <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        {...user}
                        {...rest}
                    />
                ))}
            </tbody> */}
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
