import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => { // в данном случае при авторизации юзера мы сначала помещаем его ключи и localId в localStorage. От туде потом его и считываем
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    }
    // delete: async (id) => {
    //     const data = await httpService.get(userEndpoint + id);
    //     return data;
    // }
};

export default userService;
