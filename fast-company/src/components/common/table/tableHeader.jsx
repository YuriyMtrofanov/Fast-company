import React from "react";
import PropTypes from "prop-types";
import { UpDownIcon } from "../../ui/upDownIcon";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({ iter: selectedSort.iter, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    const renderUpDownIcon = (item) => {
        if (selectedSort.iter === item) { return (<UpDownIcon { ...selectedSort }/>); };
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key = {column}
                        onClick = { columns[column].iter
                            ? () => handleSort(columns[column].iter)
                            : undefined}
                        {...{ role: columns[column].iter && "button" }}
                        scope="col"
                    >
                        { columns[column].name }
                        { columns[column].iter &&
                            renderUpDownIcon(columns[column].iter)
                        }
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
