import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

export const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        // При отрисовке таблицы мы обрабатываем как текстовый контент,
        // так и отображаем кнопки и закладки, которые являются компонентами.
        // Для начала проверим нашу строку на наличие компонентов в колонке
        if (columns[column].component) {
            const component = columns[column].component;
            // Во вторую очередь проверим какой тип данных мы получаем в этом поле
            // Если нам нужно отрисовать компонент, то мы вызываем функцию,
            // Но также у нас может быть и строковый тип данных, поэтому выполним
            // вторую проверку на тип данных
            // Так как мы отображаем два вида данных в строке: функцию (которая вызывает компонент "Bookmark", или )
            if (typeof component === "function") {
                // Если поле с ключем "component" существует и это функция, то мы вызываем эту функцию и передаем в
                // нее "item" в данном случае = "user" (доступ к которому так необходим уровнем выше для отрисовки коп-та)
                return component(item);
                // В противном случае возвращаем "component" как строку
            } return component;
        } else {
            if (columns[column].iter === "name") {
                const result = _.get(item, columns[column].iter);
                // console.log(result, `link: /users/${item._id}`);
                return (
                    <>
                        <Link key = {item._id} to = {`users/${item._id}`}>
                            {result}
                        </Link>
                    </>
                );
                // return result;
            } else {
                // Если же поля "component" не существует, то выводим статические данные из объекта "user".
                return _.get(item, columns[column].iter);
            }
        }
        /* Проверка: Если в столбце есть component (кнопка или закладка),
        то отображается он, в противном случае отображаются статические данные
        columns[column].component
            ? columns[column].component
            // для доступа к данным по сложному ключу (profession.name) использ-м
            // метод ".get" библиотеки "lodash". Прямой запрос item[columns[column].iter]
            // работает только с простыми ключами типа "name"
            : _.get(item, columns[column].iter)
        Либо аналогичный тип записи как в уроке:
        columns[column].component || _.get(item, columns[column].iter) */
    };

    return (
        <tbody>
            {data.map((item) => (
                // По сути "data" - это "users", а "item" это "user"
                <tr key = {item._id}>
                    {Object.keys(columns).map(column => (
                    // Получаем ключи объекта columns (name, qualities, profession и т.д.)
                    // С помощью ключей мы получаем доступ к итератору, который является ключом
                    // к объекту с  исходными данными "users"
                        <td key = {column}>
                            {renderContent(item, column)}
                            {/* {columns[column].component || _.get(item, columns[column].iter)} */}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};
