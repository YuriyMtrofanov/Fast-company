import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    // По умолчанию открывается форма Login, однако правильнее будет установить условие:
    // Если type = "register", то мы возвращаем "register", в противном случае если передан
    // любой другой парметр, мы задаем type = "login" для переадресации на "login"
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    // В зависимости от "formType" нам нужно отобразить "LoginForm" или "RegisterForm"

    const changeFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register"
                        ? <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>Already have account?{" "}
                                <a role="button" onClick = {changeFormType}>
                                    {" "}Sign in.
                                </a>
                            </p>
                        </>
                        : <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>Dont have account?{" "}
                                <a role="button" onClick = {changeFormType}>
                                    {" "}Sign up.
                                </a>
                            </p>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Login;
