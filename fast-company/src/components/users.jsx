import React, { useState, useEffect } from "react";
import api from "../api";
import { User } from "./user";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus.jsx";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";

export const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProperty, setSelectedProperty] = useState();

    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        // console.log(selectedProperty);
    }, [selectedProperty]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleItemSelect = (params) => {
        setSelectedProperty(params);
    };

    const filteredUsers = selectedProperty
        ? users.filter(user => user.profession._id === selectedProperty)
        : users;

    const count = filteredUsers.length;
    const pageSize = 4;
    const usersCropp = paginate(filteredUsers, currentPage, pageSize);

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
                    <SearchStatus length={count} />
                </h1>
                {count > 0 && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Закладки</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersCropp.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
