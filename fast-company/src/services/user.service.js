import httpService from "./http.service";

const userEndpoint = "user/";
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        // console.log("httpService.put", data);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        // console.log("httpService.put", data);
        return data;
    },
    getUser: async (payload) => {
        const { data } = await httpService.get(userEndpoint + payload._id);
        // console.log("httpService.get", data);
        // console.log("httpService.get", userEndpoint + payload._id);
        return data;
    }
    // delete: async (id) => {
    //     const data = await httpService.get(userEndpoint + id);
    //     return data;
    // }
};

export default userService;
