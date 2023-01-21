import React, { useState, useEffect } from "react";
import api from "../api";
import _ from "lodash";
import { UsersTable } from "./usersTable";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus.jsx";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";

export const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => {
            setUsers(data);
        });
    }, []);

    const handleBoookMark = (userId) => {
        const usersBM = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(usersBM);
    };

    const handleDelete = (userId) => {
        const currentUsers = users.filter(
            (user) => user._id !== userId
        );
        setUsers(currentUsers);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProperty, setSelectedProperty] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProperty]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleItemSelect = (params) => {
        setSelectedProperty(params);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProperty
            ? users.filter(user => user.profession._id === selectedProperty)
            : users;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

        const count = filteredUsers.length;
        const pageSize = 8;
        const usersCropp = paginate(sortedUsers, currentPage, pageSize);

        const handleClearList = () => {
            setSelectedProperty();
        };

        return (
            <div className="d-flex">
                {professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items = { professions }
                            selectedItem = { selectedProperty }
                            onItemSelect = { handleItemSelect }
                            valueProperty = "_id"
                            contentProperty = "name"
                        />
                        <button
                            className = "btn btn-secondary mt-2"
                            onClick = {handleClearList}
                        > Сброс </button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <h1>
                        <SearchStatus length = { count } />
                    </h1>
                    {count > 0 && (
                        <UsersTable
                            users = { usersCropp }
                            onSort = { handleSort }
                            selectedSort = { sortBy }
                            onBookMark = { handleBoookMark }
                            onDelete = { handleDelete }
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount = { count }
                            pageSize = { pageSize }
                            currentPage = { currentPage }
                            onPageChange = { handlePageChange }
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return ("Loading...");
    };
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
