import axios from "axios";
import configFile from "../config.json";

// Зададим базовый роут ссылки на сервер (http://localhost:4000/api/v1/),
// Т.о. мы можем при вызове URL вообще не указывать знвчение этой ссылки.
// Она как бы подтягивается по умолчанию.
// axios.defaults.baseURL = configFile.apiEndpoint;
// Теперь на основе данного выражения создадим экземпляр данного выражения т.н. инстанс
// Делаем мы это для того чтобы создать несколько разных конфигураций. Например где-то нам
// нужно чтобы в ссылку в запросе добавлялся .json, а где-то нет.
const http = axios.create({
    baseURL: configFile.apiEndpoint
});

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
    // return data;
};

// Далее при обоработке ответа мы вызываем transformData() и получаем массив с данными
http.interceptors.response.use(
    (response) => {
        response.data = { content: transformData(response.data) };
        return response;
    }
);

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            // Проверяем наличие "/". В случае его наличия удаляем и добавляем в конце
            // к ссылке суффикс ".json".
            const isContainsSlash = /\/$/gi.test(config.url);
            config.url =
                (isContainsSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete
};

export default httpService;
