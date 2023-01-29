import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

export const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
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
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key = {item._id}>
                    {Object.keys(columns).map(column => (
                        <td key = {column}>
                            {renderContent(item, column)}
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
