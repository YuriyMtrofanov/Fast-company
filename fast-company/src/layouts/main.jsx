import React from "react";
import useMocData from "../utils/mocData";

const Main = () => {
    const { error, initialize, progress, status } = useMocData();

    const handleClick = () => {
        initialize();
    };
    return (
        <div className="containe mt-5">
            <h1>Main Page</h1>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <h3>Инициализация данных в FireBase</h3>
            <button className="btn btn-primary" onClick = {handleClick}>Инициализировать</button>
        </div>
    );
};

export default Main;
