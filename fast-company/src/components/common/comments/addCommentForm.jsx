import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        userId: "", // id пользователя
        content: "" // содержание комментария
    });

    const [users, setUsers] = useState({});
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            const usersList = Object.keys(data).map((userId) => ({
                label: data[userId].name,
                value: data[userId]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const [errors, setErrors] = useState();
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберете пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Введите текст сообщения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData({
            userId: "",
            content: ""
        });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
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
                                rows= "3"
                                onChange = {handleChange}
                                value = {data.content}
                                error={errors.content}
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
