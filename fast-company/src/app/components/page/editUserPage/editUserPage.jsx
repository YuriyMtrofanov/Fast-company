import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
// import { useAuth } from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadStatus } from "../../../store/professions";
import { editUserInfo, getCurrentUserData } from "../../../store/users";

const EditUserPage = () => {
    // const { editUserInfo } = useAuth(); // Вот с этим методом нужно будет поработать
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState();
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadStatus());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getQualitiesById = (qualitiesIds) => {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };

    function transformData(data) {
        return getQualitiesById(data).map((q) => ({
            label: q.name,
            value: q._id,
            color: q.color
        }));
    };

    useEffect(() => {
        if (currentUser && !professionsLoading && !qualitiesLoading && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [currentUser, professionsLoading, qualitiesLoading, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...currentUser,
            name: data.name,
            email: data.email,
            profession: data.profession,
            sex: data.sex,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(editUserInfo(newData));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading
                        ? (<form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>)
                        : ("Loading...")
                    }
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
