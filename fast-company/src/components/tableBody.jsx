import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (component === "function") {
                return component(item);
            } return component;
        } else {
            return _.get(item, columns[column].iter);
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
