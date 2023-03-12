import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList from "../../common/comments/commentsList";
import AddCommentForm from "../../common/comments/addCommentForm";
import API from "../../../api";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    useState(() => {
        API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
    }, []);
    const handleRemove = (id) => {
        API.comments.remove(id).then(id => {
            const changedComments = comments.filter((comment) => {
                return comment._id !== id;
            });
            setComments(changedComments);
        });
    };
    const handleSubmit = (data) => {
        API.comments.add({ ...data, pageId: userId }).then(comment => setComments([...comments, comment]));
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit = {handleSubmit}/>
                </div>
            </div>
            {sortedComments.length > 0 &&
                (<div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList data = {sortedComments} onRemove = {handleRemove}/>
                    </div>
                </div>)
            }
        </>
    );
};

export default Comments;
