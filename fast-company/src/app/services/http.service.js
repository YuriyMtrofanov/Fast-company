import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            // условие для работы с firebase
            if (refreshToken && expiresDate < Date.now()) { // Строчка повторяется, поэтому её можно сохранить в константу isExpired
                // const { data } = await httpAuth.post("token", {
                //     grant_type: "refresh_token",
                //     refresh_token: refreshToken
                // });
                const data = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_id,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            // условие для работы с localhost
            if (refreshToken && expiresDate < Date.now()) { // Строчка повторяется, поэтому её можно сохранить в константу isExpired
                const data = await authService.refresh();
                // в данном случае все ключи данных одинаковые, поэтому просто пишем data
                // localStorageService.setTokens({
                //     refreshToken: data.refreshToken,
                //     accessToken: data.accessToken,
                //     expiresIn: data.expiresIn,
                //     userId: data.userId
                // });
                localStorageService.setTokens(data);
                // console.log("authService data: ", data);
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data;
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        // console.log("res.data.content", res.data);
        res.data = { content: res.data }; // для работы с localhost
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};
export default httpService;
