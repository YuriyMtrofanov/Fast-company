import React from "react";
import PropTypes from "prop-types";

export const BookMark = ({ status, ...rest }) => {
    return (
        <h3 {...rest}>
            <i className={"bi bi-person" + (status === true ? "-check-fill" : "")}></i>
        </h3>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};

// Моё старое решение:
// export const BookMark = ({ bookmark }) => {
// const addBookMark = () => {
// return status === true
//     ? (<i
//         className="bi bi-person-check-fill"
//         // onClick={() => onBookMark(_id)}
//     ></i>)
//     : (<i
//         className="bi bi-person"
//         // onClick={() => onBookMark(_id)}
//     ></i>);
// };
// return <h3>{addBookMark()}</h3>;
