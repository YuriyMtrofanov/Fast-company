import React, { useState, useEffect } from "react";
import api from "../api";
import { User } from "./user";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus.jsx";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";

export const Users = ({ users, ...rest }) => {
    // users передает параметры объекта с данными
    // ...rest передает все обработчики (onDelete и onBookMark)

    // Для реализации пагинации и отображения требуемой страници, зададим состояние:
    const [currentPage, setCurrentPage] = useState(1); // по умолчанию отображается 1я страница т.к. мы задаем начальное состояние = 1
    const [professions, setProfessions] = useState(); //  Реализуем получение данных о профессиях по api
    const [selectedProperty, setSelectedProperty] = useState(); // зададим состояние выбранной в текущий момент страницы и
    // наачальное значение оставим пустым, т.к. получим его асинхронно. Реализуем это с помощью хука useEffect().
    // Данный хук единожды вызывается при рендере всей страницы (параметр []). С его помощью мы запрашиваем данные с
    // fake.api и когда данные будут получены (с некоторой задержкой) обработаем с помощью метода then т.к. получаем промис и
    // зададим начальное состояние для списка профессий т.к. изначально мы состояние не задаем useState() (в этом нет смысла т.к. зарос асинхронный).
    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
    }, []);

    // На текущий момент при выборе фильтра (выборе профессии) весь контента умещается на 1й и аозможно на 2й страницах,
    // а выбрана, скажем третья. И получается , что мы видим пустую страницу без контента, но он есть т.к.
    // количество юзеров больше нуля. Чтобы этого избежать нужно при изменении профессии задавать номер
    // страницы равный 1. С помощью хука useEffect отследим изменение профессии (selectedProperty) и
    // и при изменении этого параметра с помощью ф-ии setCurrentPage зададим состояние currentPage = 1. Т.е
    // при изменении фильтра принудительно сбросим номер страницы до 1:
    useEffect(() => {
        setCurrentPage(1);
        console.log(selectedProperty);
    }, [selectedProperty]);

    // Функция-обработчик события выбора номера страницы в <Pagination/>
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleItemSelect = (params) => { // Реализуем функцию-обработчик для выбора нужного для фильтрации параметра
        setSelectedProperty(params); // так как при клике на компонент мы получаем объект с данными
    };

    // Отфильтруем исходный список юзеров по выбранному условию (profession).
    // Для этого проверим выброно ли условие (selectedProperty ?) если да, то
    // с помощью метода filter пробегаемся по массиву users и получаем новы массив
    // filteredUsers, компоненты которого удовлетворяют условию (user.profession === selectedProperty)
    // т.е. мы оставляем компоненты у которых есть выбранное свойство selectedProperty
    const filteredUsers = selectedProperty
        ? users.filter(user => user.profession._id === selectedProperty)
        : users;

    // кол-во пользователей выделим в отдельную переменную. При этом количество юзеров мы вычисляем после фильтрации
    // поэтому нам нужно мспользовать не исходный массив "users" (из компонента "Арр" он нередаётся как "usersList").
    // Изначально в построении логики я использовал "users.length"
    const count = filteredUsers.length;
    const pageSize = 4; // зададим количество страниц равным 4
    // Разобьем список юзеров (users или в нашем случае отфильтрованный список filteredUsers)
    // на страницы в зависимости от размера страницы (pageSize) и соберем их
    // в новый массив (usersCropp) в зависимости от выбронной страницы (currentPage)
    const usersCropp = paginate(filteredUsers, currentPage, pageSize);

    // Для сброса фильтра мы создаем кнопку "Сброс", вешаем обработчик событий, при клике на котором
    // выполняется ф-я handleClearList. Она в свою очередь обнуляет значение состояния выбранного фильтра
    // т.е. мы буквально обновляем состояние, передавая в него пустое значение.
    const handleClearList = () => {
        setSelectedProperty();
    };

    // При рендеринге компонентов мы будем пробегаться методом .map не по "users", а по "usersCropp"
    // в соответствии с разбиением контента на страницы
    return (
        <div className="d-flex">
            {professions && // Так как запрос данных асинхронный, то при вызове компонента
            // сначала нужно проверить а есть ли данные для рендеринга компонента
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items = { professions } // значение основного параметра, по которому будем фильтровать компоненты
                        selectedItem = { selectedProperty } // данное состояние вводится для выделения выбранного пункта цветом
                        onItemSelect = { handleItemSelect } // обработчик выбранного компонента. Получает и меняет состояние в зависимости от выбранного элемента
                        valueProperty = "_id" // значение универсального параметра для ключа списка фильтров (при рендере списка)
                        contentProperty = "name" // значение универсального параметра для названия элемента, по которому фильтруем (профессия)
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
                {count > 0 && ( // таблица рендерится когда кол-во юзеров > 0 (раньше  было users.length > 0)
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
                        itemsCount={count} // в нашем случае 12
                        pageSize={pageSize} // по условию 4 компонента на странице
                        currentPage={currentPage} // передаем значение текущей страницы доч. кома-у
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
    // selectedProperty: PropTypes.string
};
