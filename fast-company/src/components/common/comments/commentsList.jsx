import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ data, onRemove }) => {
    const handleClick = (id) => {
        onRemove(id);
    };
    return (
        <>
            {data.map((comment) => (
                <Comment
                    key = {comment._id}
                    id = {comment._id}
                    onRemove = {handleClick}
                    authorId = {comment.userId}
                    createdAt = {comment.created_at}
                    content = {comment.content}
                />
            ))}
        </>
    );
};

CommentsList.propTypes = {
    data: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default CommentsList;
