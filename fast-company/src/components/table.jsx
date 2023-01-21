import React from "react";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import PropTypes from "prop-types";

export const Table = ({ data, columns, selectedSort, onSort, children }) => {
    return (
        // Перед рендеоингом проверяем сущесствуют ли дочерние компоненты в "Table"
        // И если они существуют, то рендерятся они. В противном случае (оператор ИЛИ)
        // Рендерятся компоненты "TableHeader" и "TableBody "
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
