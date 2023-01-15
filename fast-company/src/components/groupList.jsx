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
            {Object.keys({ ...items }).map((key) => (
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

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string
};
