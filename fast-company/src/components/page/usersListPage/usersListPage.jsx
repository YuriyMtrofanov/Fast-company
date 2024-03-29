import React, { useState, useEffect } from "react";
import api from "../../../api";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import { GroupList } from "../../common/groupList";
import { SearchStatus } from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import { useUser } from "../../../hooks/useUsers";

const usersListPage = () => {
    // const [users, setUsers] = useState();
    const { users } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProperty, setSelectedProperty] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [inputData, setInputData] = useState("");

    // useEffect(() => {
    //     api.users.fetchAll().then(data => {
    //         setUsers(data);
    //     });
    // }, []);

    const handleBoookMark = (userId) => {
        const usersBM = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(usersBM);
        console.log(usersBM);
    };

    const handleDelete = (userId) => {
        // const currentUsers = users.filter(
        //     (user) => user._id !== userId
        // );
        // setUsers(currentUsers);
        console.log(userId);
    };

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

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleClearList = () => {
        setSelectedProperty();
    };

    const handleItemSelect = (params) => {
        setSelectedProperty(params);
        if (inputData) {
            setInputData("");
        }
    };

    const handleInputChange = (target) => {
        handleClearList();
        setInputData(target.value);
    };

    const handleSubmit = (target) => {
        // preventDefault();
        // console.log(target);
    };

    if (users) {
        let filteredUsers = users;
        if (inputData) {
            filteredUsers = users.filter(user => user.name.toLowerCase().includes(inputData));
        } else if (selectedProperty) {
            filteredUsers = users.filter(user => user.profession._id === selectedProperty);
        };

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
        const count = filteredUsers.length;
        const pageSize = 8;
        const usersCropp = paginate(sortedUsers, currentPage, pageSize);

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

usersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default usersListPage;
