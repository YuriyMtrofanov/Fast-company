import React from "react";
import PropTypes from "prop-types";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import { BookMark } from "./bookmark";
import { QualitiesList } from "./qualitiesList";
import { Table } from "./table";

export const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onBookMark,
    onDelete
}) => {
    // Объект, являющийся шаблоном назметки таблици. "iter" - это ключ объекта с
    // исходными данными "user", а "name" - это название столбца с данными
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            // component: "qualities"
            component: (user) => (
                <QualitiesList {...{ qualities: user.qualities }} />
                // Либо более упрощенная запись:
                // <QualitiesList qualities = { user.qualities }/>
            )
        },
        profession: { iter: "profession.name", name: "Профессия" },
        completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: {
            iter: "bookmark",
            name: "Избранное",
            // Т.к. для реализации закладок требуется доступ к "user", который
            // мы получаем на более низком уровне путем перебора "users", то вызов
            // компонента на уровень выше мы реализуем через функцию, аргументом котоорой
            // будет "user", получаемый ниже уровнем и передаваемый в "component(item)"
            // (в теле функции "renderContent()") объекта columns.
            // ВАЖНО! Здесь мы не выполняем функцию, а возвращаем компонент, поэтому
            // используем не {}, а ()
            component: (user) => (
                <BookMark
                    status = { user.bookmark }
                    onClick = {() => onBookMark(user._id)}
                    {...{ role: "button" }}
                />
            )
        },
        delete: {
            // По аналогии через функцию реализум кнопку "Delete"
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
    // Первый вариант доступа к талблице:
    // <Table
    //     data = { users }
    //     columns = { columns }
    //     selectedSort = { selectedSort }
    //     onSort = { onSort }
    // />

        // Второй более универсальный вариант доступа к таблице с проверкой на
        // наличие дочерних компонентов:
        <Table>
            <TableHeader { ...{ onSort, selectedSort, columns }}/>
            <TableBody { ...{ data: users, columns } }/>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
