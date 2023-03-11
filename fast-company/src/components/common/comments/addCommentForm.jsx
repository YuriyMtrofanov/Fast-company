import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        userId: "", // id пользователя
        content: "" // содержание комментария
    });
    const [users, setUsers] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(data);
    };

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            const usersList = Object.keys(data).map((userId) => ({
                label: data[userId].name,
                value: data[userId]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const clearForm = () => {
        setData({
            userId: "",
            content: ""
        });
        // setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
        clearForm();
    };

    return (
        <>
            <form onSubmit = {handleSubmit}>
                <div className="card-body">
                    {Object.keys(users).length > 0 &&
                        <div>
                            <h2>New comment</h2>
                            <SelectField
                                label="New comment"
                                defaultOption="Выберете пользователя"
                                options={users}
                                name="userId"
                                onChange={handleChange}
                                value={data.userId}
                            />
                            <TextAreaField
                                type = "text"
                                id = "content"
                                name = "content"
                                value = {data.content}
                                rows= "3"
                                onChange = {handleChange}
                            />
                            <button
                                type = "submit"
                                className = "btn btn-primary"
                            >Опубликовать</button>
                        </div>}
                </div>
            </form>
        </>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
