import axios from "axios";
// import { toast } from "react-toastify"; // Импортируем метод для отображения ошибок для пользователя
import configFile from "../config.json";
// Зададим базовый роут ссылки на сервер (http://localhost:4000/api/v1/),
// Т.о. мы можем при вызове URL вообще не указывать знвчение этой ссылки.
// Она как бы подтягивается по умолчанию.
axios.defaults.baseURL = configFile.apiEndpoint;

// Для обработки неожидаемых ошибок используем метод "interceptors" (перехватчи)
// Данный метод может перехватывать как request (запрос), так и response (ответ от сервера)
// С помощью обработчика "use". Данная метод принимает в себя два аргумента: удачный и неудачный
// Для удачного просто выведем коллбэк (response) => response т.е. ответ от сервера без изменений,
// а для неудачного - поймаем ошибку. В прортивном случае передаем ошиобку дальше и продолжаем
// работу промиса т.к. мы не обрабатываем иные ошибки в этом обработчике
/* axios.interceptors.response.use(
    (response) => response,
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedErrors) {
            // Логируем ошибку с помощью сервиса Sentry
            // Sentry.captureException(error);
            console.log(error);
            // Для отображения ошибки для полльзователя
            // console.log("unexpected error");
            toast.error("Something goes wrong. Try later.");
            // toast("unexpected error");
        }
        return Promise.reject(error);
    }
); */

// Так как от fireBase мы получаем данные в виде объекта, но нам нужен массив, то требуется
// преобразовать данные с помощью функции:
function transformData(data) {
    return data
        ? Object.keys(data).map(key => ({ ...data[key] }))
        : [];
};
// Далее при обоработке ответа мы вызываем transformData() и получаем массив с данными
axios.interceptors.response.use(
    (response) => {
        response.data = { content: transformData(response.data) };
        // console.log("response.data.content", response.data);
        return response;
    }
);

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const isContainsSlash = /\/$/gi.test(config.url);
            config.url = (
                isContainsSlash
                    ? config.url.slice(0, -1)
                    : config.url) + ".json";
            // console.log("config.url", config.url); // quality.json или profession.json
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
};

export default httpService;
