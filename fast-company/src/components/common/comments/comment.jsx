import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

const Comment = ({ id, content, createdAt, authorId, onRemove }) => {
    const [author, setAuthor] = useState();

    useEffect(() => {
        api.users.getById(authorId).then((author) => {
            setAuthor(author.name);
        });
    }, []);
    // Создать вместо этой функции универсальную функцию для преобразования даты в utils
    const convertDate = () => {
        return new Date(Number(createdAt)).toString();
    };

    const handleClick = ({ target }) => {
        onRemove(id);
        console.log(target);
    };

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {author}{" "}
                                        <span className="small">
                                            {convertDate()}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg" onClick = {handleClick}></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    onRemove: PropTypes.func
};

export default Comment;
