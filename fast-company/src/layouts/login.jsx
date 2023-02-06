import React, { useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [inputData, setInputData] = useState({ email: "", password: "" }); // Задаем состояние для всей формы сразу (Информация, вводимая в полях ввода).

    const handleChange = (event) => { // Создаем обработчик, фиксирующий изменения вводимой информации
        console.log("name: ", event.target.name, "value: ", event.target.value);
        setInputData(prevState => (
            { ...prevState, [event.target.name]: event.target.value }
        ));
    };

    return (
        <form action="">
            {/* <div>
                <label htmlFor="email">Email</label>{" "}
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={inputData.email} // inputData - объект с ключами email и password (event.target.name). По данным ключам хранятся данные "event.target.value"
                    onChange={handleChange}
                />
            </div> */}
            <TextField
                title = "Email"
                type = "text"
                name = "email"
                value = {inputData.email}
                onChange = {handleChange}
            />
            {/* <div>
                <label htmlFor="password">Password</label>{" "}
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={inputData.password} // inputData - объект с ключами email и password (event.target.name). По данным ключам хранятся данные "event.target.value"
                    onChange={handleChange}
                />
            </div> */}
            <TextField
                title = "Password"
                type = "password"
                name = "password"
                value = {inputData.password}
                onChange = {handleChange}
            />
        </form>
    );
};

export default Login;
