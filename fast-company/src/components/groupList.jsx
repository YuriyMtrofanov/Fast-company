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
        // Для реализации универсального получения (из объекта или из массива) при получении
        // массива ключей я использую оператор rest и из полученнных данных делаю новый объект,
        // который уже и использую в дальнейшем.
        // Т.е. вместо Object.keys(items) я использую Object.keys({ ...items })
        // Т.о. в случае работы с объектом мы получаем массив ключей с названиями профессий
        // а в случае работы с массивом - массив ключей будет состоять из индексов массива
        <ul className="list-group">
            {Object.keys({ ...items }).map((key) => (
                <li
                    key = { items[key][valueProperty] }
                    // динамически меняем класс выделенного элемента списка, чтобы его подсветить
                    // здесь мы сравниваем объекты: если выбранный объект равен отренедренному, то
                    // к его классу добавляется "active" и пункт подсвечивается, в противном случае
                    // класс остается "list-group-item" и не подсвечивается.

                    // Так как я унифицировал тип входных данных, следует сравнивать уже не объекты, а
                    // конкретные данные из этих объектов. В данном случае я сравниваю _id. Связано это
                    // с тем, что ключи объекта - это названия профессий, а ключи массива - индексы
                    // и если сравнивать просто объекты (когда api у нас массив), то фильтрациия перестает работать.
                    // Ну и в "users" при определении filteredUsers я фильтрую не по объекту целиком, а по его _id
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
    selectedItem: PropTypes.string // исправил на строку т.к. ранее мы сравнивали объекты, а сейчас id этих объектов
};
