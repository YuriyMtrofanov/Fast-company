import React from "react";
import PropTypes from "prop-types";

export const GroupList = ({
    items,
    selectedItem,
    onItemSelect,
    valueProperty,
    contentProperty
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key = { items[item][valueProperty] }
                    // динамически меняем класс выделенного элемента списка, чтобы его подсветить
                    // здесь мы сравниваем объекты: если выбранный объект равен отренедренному, то
                    // к его классу добавляется "active" и пункт подсвечивается, в противном случае
                    // класс остается "list-group-item" и не подсвечивается
                    className = {"list-group-item " + (items[item] === selectedItem ? "active" : "")}
                    onClick = {() => onItemSelect(items[item])}
                    role = "button"
                >
                    { items[item][contentProperty] }
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
