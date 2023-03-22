import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

const useMocData = () => {
    const constStatus = { // консатанта, хранящая в себе статусы запросов
        idle: "Not started",
        pending: "In process",
        successed: "Ready",
        error: "Error occured"
    };
    const [status, setStatus] = useState(constStatus.idle);
    const [progress, setProgress] = useState(0); // Прогресс в процентах
    const [count, setCount] = useState(0); // Количество запросов
    const [error, setError] = useState(null);

    function incrementCount() {
        setCount(prevState => prevState + 1);
    };

    function updateProgress() {
        if (count !== 0 && status === constStatus.idle) { // проверяем равен ли статус  "Not started" и не равно ли количество запросов нулю т.е. запросы начали идти
            setStatus(constStatus.pending); // и при таком раскладе меняем статус на "In process"
        }
        const newProgress = Math.floor((count / summaruCount) * 100); // Вычисляем прогресс в процентах отношением количество успешных запросов к общему чилу запросов
        if (progress < newProgress) {
            setProgress(() => newProgress); // записываем состояние прогресса последовательно, вызвав коллбэк
        }
        if (newProgress === 100) {
            setProgress(constStatus.successed);
        }
    };

    const summaruCount = professions.length + qualities.length + users.length; // Общее количество запросов

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount(); // В каждом цикле вызываем incrementCount() и считаем успешные запросы
            }
            for (const profession of professions) {
                await httpService.put("profession/" + profession._id, profession);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(constStatus.error);
        }
    };
    return { error, initialize, progress, status };
};

export default useMocData;
