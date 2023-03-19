import httpService from "./http.service";

const userEndpoint = "user/";
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
    // get: async (id, content) => {
    //     const data = await httpService.get(userEndpoint + id, content);
    //     return data;
    // },
    // create: async (content) => {
    //     const data = await httpService.get(userEndpoint + content);
    //     return data;
    // },
    // update: async () => {
    //     const data = await httpService.get(userEndpoint + id);
    //     return data;
    // },
    // delete: async (id) => {
    //     const data = await httpService.get(userEndpoint + id);
    //     return data;
    // }
};

export default userService;
