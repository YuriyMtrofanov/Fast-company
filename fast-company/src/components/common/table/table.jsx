import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ data, columns, selectedSort, onSort, children }) => {
    return (
        <table className="table table-striped">
            {children ||
                <>
                    <TableHeader { ...{ onSort, selectedSort, columns }}/>
                    <TableBody { ...{ data, columns } }/>
                </>
            }
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object,
    selectedSort: PropTypes.object,
    onSort: PropTypes.func,
    children: PropTypes.array
};

export default Table;
