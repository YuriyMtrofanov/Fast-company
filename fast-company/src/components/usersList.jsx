import React, { useState, useEffect } from "react";
import api from "../api";
import _ from "lodash";
import { UsersTable } from "./usersTable";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus.jsx";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import TextField from "./textField";

export const UsersList = () => {
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

    const [inputData, setInputData] = useState("");

    // обработчик, записыывающий данные из поля ввода в переменную "inputData"
    const handleInputChange = (event) => {
        setInputData(() => event.target.value);
    };

    // обработчик отправки данных на сервер. Пока не задействован.
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target);
    };

    if (users) {
        // На этом этапе требуется понять каким образом реализовать взаимоисключающий поиск
        const filteredUsers = selectedProperty
            ? users.filter(user => user.profession._id === selectedProperty)
            : users.filter(user => user.name.toLowerCase().includes(inputData));
        /*
        const foundUsers = users.filter(user => user.name.includes(inputData));
        console.log(foundUsers);
        // Надо разобраться какую переменную раньше вводить
        const filteredUsers = selectedProperty
            ? users.filter(user => user.profession._id === selectedProperty)
            : users;
        */
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
                    <form onSubmit = { handleSubmit }>
                        <TextField
                            type = "text"
                            name = "search"
                            placeholder = "Search"
                            value = {inputData}
                            onChange = {handleInputChange}
                        />
                    </form>
                    {count > 0 && (
                        <UsersTable
                            users = { usersCropp }
                            onSort = { handleSort }
                            selectedSort = { sortBy }
                            onBookMark = { handleBoookMark }
                            onDelete = { handleDelete }
                            input = { inputData }
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

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
