import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export const GroupList = ({
    items,
    selectedItem,
    onItemSelect,
    valueProperty,
    contentProperty
}) => {
    if (_.isArray(items) === true) {
        return (
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key = { item[valueProperty] }
                        className = {"list-group-item " + (item[valueProperty] === selectedItem ? "active" : "")}
                        onClick = {() => onItemSelect(item[valueProperty])}
                        role = "button"
                    >
                        { item[contentProperty] }
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <ul className="list-group">
                {Object.keys(items).map((key) => (
                    <li
                        key = { items[key][valueProperty] }
                        className = {"list-group-item " + (items[key][valueProperty] === selectedItem ? "active" : "")}
                        onClick = {() => onItemSelect(items[key][valueProperty])}
                        role = "button"
                    >
                        { items[key][contentProperty] }
                    </li>
                ))}
            </ul>
        );
    };
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string // исправил на строку т.к. ранее мы сравнивали объекты, а сейчас id этих объектов
};
