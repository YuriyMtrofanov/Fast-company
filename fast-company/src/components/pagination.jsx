import React from "react";
import _ from "lodash"; // "Lodash"
import PropTypes from "prop-types"; // "PropTypes"

const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    // чтобы не складировать лишние переменные можем сразу передеть их в компонент
    // в качесве аргументов:
    // const Pagination = ( {itemsCount, pageSize, onPageChange, currentPage} ) => {}
    // для проверки параметров, передаваемых в компонент воспользуемся библиотекой PropTypes (npm i prop-types)
    // Проверку реализую в самом низу страницы

    // Далее вычислим, какое количество страниц требуется отбразить.
    // Для этого нужно кол-во компонентов (itemsCount) разделить
    // на рамер страницы (pageSize) (сколько компонентов помещается на страницу)
    // и воспользуемся округлением в большую сторону т.к. числа не всегда делятся
    // без остатка
    const pagesCount = Math.ceil(itemsCount / pageSize);
    // Если количество элементов не хватает на 1 страницу, то и отображать её не нужно
    // Для этого предварительно установим условие:
    if (pagesCount === 1) return null;

    // Далее из pagesCount следует сделать массив с номерами страниц
    // Для этого воспользуемся библиотекой "Lodash" (npm i lodash@4.17.15) и воспользоваться методом "range"
    const pages = _.range(1, pagesCount + 1);
    // в данном случае задаем начальное (1) и конечное (pagesCount+1) значения

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        // на данном этапе нужно подсветить активную страницу, добавив класс "active",
                        // используем для этого тернарное выражение page === currentPage ? "active" : ""
                        // и не забываем про пробел после "page-item ", чтобы классы не слились в одно слово
                        className={
                            "page-item " +
                            (page === currentPage ? "active" : "")
                        }
                        key={"page_" + page}
                    >
                        <button
                            className="page-link"
                            // обязательно вешаем обработчик событий, который получает номер активной страницы
                            // и обновляет состояние для отображения конкретной страницы
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    // для провверки указываем переменные, которые передаются в компонент, укажем их типы (PropTypes.____),
    // и укажем является ли данный тип необходимым (.isRequaired)
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
// У данного метода есть еще один плюс, при вызове компонента <Pagination /> при нажатии внутри тега "ctrl + space"
// появится подсказка с указанием переменных и их типов, которые необходимо отобразить

export default Pagination;
