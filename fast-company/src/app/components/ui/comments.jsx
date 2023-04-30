import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments, getCommentsLoadStatus, loadCommentsList, removeComment } from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const dispatch = useDispatch();
    const params = useParams(); // pageId === params.userId
    const currentUserId = useSelector(getCurrentUserId()); // currentUserId
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadStatus());
    useEffect(() => {
        dispatch(loadCommentsList(params.userId));
    }, [params.userId]);

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: params.userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        dispatch(createComment(comment));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading
                            ? (<CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />)
                            : ("loading...")
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
