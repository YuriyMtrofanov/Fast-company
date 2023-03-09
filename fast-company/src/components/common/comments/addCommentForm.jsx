import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { useParams } from "react-router-dom";
import SelectField from "../form/selectField";

const AddCommentForm = ({ onSubmit }) => {
    const { userId } = useParams();
    const [data, setData] = useState({
        user: "",
        comment: ""
    });
    const [users, setUsers] = useState([]);
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            const usersList = Object.keys(data).map((user) => ({
                name: data[user].name,
                value: data[user]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // console.log("value", { [target.name]: target.value });
        // console.log("target", target);
    };
    // const clearForm = () => {
    //     setData({ user: "", comment: "" });
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const exportData = {
            userId: data.user, // автор поста
            pageId: userId, // страница пользователя, на которой размещен пост
            content: data.comment // содержание поста
        };
        // console.log("exportData", {
        //     userId: data.user, // автор поста
        //     pageId: userId, // страница пользователя, на которой размещен пост
        //     content: data.comment // содержание поста
        // });
        onSubmit(exportData);
        // clearForm();
        console.log(data);
        // setData({
        //     user: "",
        //     comment: ""
        // });
    };
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        {/* <div className="mb-4">
                            <select
                                className = "form-select"
                                id = "userId"
                                name = "user"
                                value = {data.name}
                                onChange = {handleChange}
                            >
                                <option disabled value="">
                                    Выберете пользователя
                                </option>
                                {users &&
                                    users.map((user) => (
                                        <option
                                            key = {user.value}
                                            value = {user.value}
                                        >{user.name}</option>
                                    ))}
                            </select>
                        </div> */}
                        <SelectField
                            label="New comment"
                            defaultOption="Выберете пользователя"
                            options={users}
                            name="user"
                            onChange={handleChange}
                            value={data.user}
                        />
                        <div className="mb-4">
                            <label
                                htmlFor = "comment"
                                className = "form-label"
                            >Сообщение</label>
                            <textarea
                                type = "text"
                                className="form-control"
                                id="comment"
                                name="comment"
                                rows="3"
                                onChange = {handleChange}
                            ></textarea>
                        </div>
                        <button
                            type = "submit"
                            className = "btn btn-primary"
                        >Опубликовать</button>
                    </div>
                </div>
            </form>
        </>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
