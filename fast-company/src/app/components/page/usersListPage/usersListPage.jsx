import React, { useState, useEffect } from "react";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
// import { useUser } from "../../../hooks/useUsers";
// import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadStatus } from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const usersListPage = () => {
    // const { users } = useUser();
    // const { currentUser } = useAuth();
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const [currentPage, setCurrentPage] = useState(1);
    const professions = useSelector(getProfessions());
    const professionsIsLoading = useSelector(getProfessionsLoadStatus());
    const [selectedProperty, setSelectedProperty] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [inputData, setInputData] = useState("");

    const handleBoookMark = (userId) => {
        const usersBM = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(usersBM);
    };

    const handleDelete = (userId) => {
        console.log(userId);
    };

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
        // console.log(target);
        handleClearList();
        setInputData(target.value);
    };

    const handleSubmit = (target) => {
        // preventDefault();
        // console.log(target);
    };

    function filterUsers(data) {
        let filteredUsers = data;
        if (inputData) {
            filteredUsers = data.filter(user => user.name.toLowerCase().includes(inputData.toLowerCase()));
        } else if (selectedProperty) {
            filteredUsers = data.filter(user => user.profession === selectedProperty._id);
        };
        return filteredUsers.filter((user) => user._id !== currentUserId); // Данный фильтр позволяет не отображать залогененного юзера в общем списке юзеров
    };

    const filteredUsers = filterUsers(users);
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const count = filteredUsers.length;
    const pageSize = 8;
    const usersCropp = paginate(sortedUsers, currentPage, pageSize);

    return (
        <div className="d-flex">
            {professions && !professionsIsLoading &&
                (<div className="d-flex flex-column flex-shrink-0 p-3">
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
                </div>)
            }
            <div className="d-flex flex-column">
                <div>
                    <SearchStatus length = { count } />
                </div>
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
};

usersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default usersListPage;
