import React from "react";
import PropTypes from "prop-types";
import { UpDownIcon } from "./upDownIcon";

export const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        // При клике по шапке таблицы с помощью onClick мы получаем параметр сортировки "item" (name, rate, bookmark и т.д.).
        // Данный параметр требуется передать в объект с условиями сортировки (sortBy = {iter: "", order: ""}) в параметр "iter",
        // который предается в "UsersTable" как "selectedSort" (это значение "sortBy" в Users). При первом клике "selectedSort"
        // содержит в себе начальное состояние "useState({ iter: "name", order: "asc" })". В дальнейшем при последующих кликах,
        // вызывается метод "onSort" который является импортированным в компонент методом "setSortBy" и меняет состояние "sortBy".
        // Теперь требуется реализовать следующий функционал:
        // Чтобы при повторном клике на параметр сортировки у нас менялся порядок сортировки на противоположный требуется проверить условие
        // при котором параметр "iter" нашего заданного состояния "sortBy" (при предыдущем клике) был равен параметру "item", по которому произошел клик
        // Если условие выполняется, то мы проверяем какой порядок задан в нашем состоянии на предыдущем шаге "prevState.order" и меняем его на противоположный
        // т.е. если он равен "asc", то меняем на "desc", а в противном случае просто меняем его на "asc".
        if (selectedSort.iter === item) {
            onSort({ iter: selectedSort.iter, order: selectedSort.order === "asc" ? "desc" : "asc" });
        // Для того, чтобы при выборе следующего параметра сортировки, сортировка возвращалась к значению "asc" следует
        // в else переназначить итератор, передав в него "item" и прередать значение по умолчанию для параметра "order" т.е. "asc" и
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    const renderUpDownIcon = (item) => {
        if (selectedSort.iter === item) { return (<UpDownIcon { ...selectedSort }/>); };
    };

    // Для реализации динамического рендеринга шапки таблицы нам потребуются входящие данные с информацией о столбцах "columns",
    // Которые могут быть как массивом, так и объектом. Для большей универсальности опишем работу с объктом, получая массив ключей,
    // и последующим перебором этого массива, на каждой итерации получая данные их исходного объекта по получаемым ключам
    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key = {column}
                        // Так как нам не требуется сортировка по полю "Качества", то перед тем как повесить обработчик на поле
                        // проведем проверку. Если у получаемого объекта есть параметр "iter", то на это поле вешаем обработчик
                        // в противном случае возвращаем "undefined"
                        onClick = { columns[column].iter
                            ? () => handleSort(columns[column].iter)
                            : undefined}
                        // Чтобы менялся вид курсора при наведение на активный параметр, использеуем role = "button"
                        // Также проверим на наличие итератора в получаемом обхекте и если он есть добавим "role"
                        // Аналогичный предыдущему пункту функционал реализуем другим способом:
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
