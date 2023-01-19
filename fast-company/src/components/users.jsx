import React, { useState, useEffect } from "react";
import api from "../api";
import { UsersTable } from "./usersTable";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus.jsx";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import _ from "lodash";

export const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProperty, setSelectedProperty] = useState();
    // Задаем состояние для сортировки списка и в качестве начального состояния передаем объект
    // и передаем в него два параметра: iter: "name" - значение по уморчанию по кторорому сортируем
    // order: "asc" - порядок сортировки (по возрастанию - "asc", по убыванию - "desc".)
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

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

    const handleItemSelect = (params) => { // Реализуем функцию-обработчик для выбора нужного для фильтрации параметра
        setSelectedProperty(params); // так как при клике на компонент мы получаем объект с данными
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProperty
        ? users.filter(user => user.profession._id === selectedProperty)
        : users;
    // создадим переменную, которая принимает в себя массив юзеров после сортирвки по какому-либо параметру
    // Делаем мы это после фильтрации, но до пагинации с помощью метода "orderBy" библиотеки "lodash"
    // Первым компонентом мы передаем массив с данными для сортировки "filteredUsers";
    // Вторым параметром передается массив из параметров, по которым будут сортироваться данные
    // Третьим - массив с порядком сортировки по возрастанию - "asc", вниз - "desc".
    // После того как мы задали состояние для параметра сортировки 2й и 3й параметры будут выражены как "sortBy.iter" и "sortBy.order"
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

    const count = filteredUsers.length;
    const pageSize = 8;
    // Пагинацию будем осуществлять с отфильтрованными и отсортированными данными
    const usersCropp = paginate(sortedUsers, currentPage, pageSize);

    const handleClearList = () => {
        setSelectedProperty();
    };

    return (
        <div className="d-flex">
            {professions && // Так как запрос данных асинхронный, то при вызове компонента
            // сначала нужно проверить а есть ли данные для рендеринга компонента
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
                    <UsersTable
                        users = { usersCropp }
                        onSort = { handleSort }
                        selectedSort = { sortBy }
                        {...rest}
                    />
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
