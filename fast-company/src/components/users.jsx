import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import { User } from "./user";
import PropTypes from "prop-types";

export const Users = ({ users, ...rest }) => {
    // users передает параметры объекта с данными
    // ...rest передает все обработчикт (onDelete и onBookMark)

    const count = users.length; // кол-во пользователей выделим в отдельную переменную
    const pageSize = 4; // зададим количество страниц равным 4

    // Для отображения требуемой страници требуется задать состояние:
    const [currentPage, setCurrentPage] = useState(1); // по умолчанию отображается 1я страница
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Получим массив с компонентами, для выбранной страницы
    const usersCropp = paginate(users, currentPage, pageSize);

    // теперь при рендеринге компонентов мы будем пробегаться сетодом .map не по "users", а по "usersCropp"
    return (
        <>
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
                        {/*     {users.map(user => (    */}
                        {usersCropp.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count} // в нашем случае 12
                pageSize={pageSize} // по условию 4 компонента на странице
                currentPage={currentPage} // передаем значение текущей страницы доч. кома-у
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
