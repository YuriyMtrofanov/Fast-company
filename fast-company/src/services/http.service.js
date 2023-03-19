import axios from "axios";
import { toast } from "react-toastify"; // Импортируем метод для отображения ошибок для пользователя
import config from "../config.json";
// Зададим базовый роут ссылки на сервер (http://localhost:4000/api/v1/),
// Т.о. мы можем при вызове URL вообще не указывать знвчение этой ссылки.
// Она как бы подтягивается по умолчанию.
axios.defaults.baseURL = config.apiEndpoint;

// Для обработки неожидаемых ошибок используем метод "interceptors" (перехватчи)
// Данный метод может перехватывать как request (запрос), так и response (ответ от сервера)
// С помощью обработчика "use". Данная метод принимает в себя два аргумента: удачный и неудачный
// Для удачного просто выведем коллбэк (response) => response т.е. ответ от сервера без изменений,
// а для неудачного - поймаем ошибку. В прортивном случае передаем ошиобку дальше и продолжаем
// работу промиса т.к. мы не обрабатываем иные ошибки в этом обработчике
axios.interceptors.response.use(
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
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
};

export default httpService;
