import httpService from "./http.service";

const professionEndpoint = "profession/";
const professionService = {
    get: async () => {
        const request = await httpService.get(professionEndpoint);
        return request.data;
    }
    // get: async (id, content) => {
    //     const data = await httpService.get(professionEndpoint + id, content);
    //     return data;
    // },
    // create: async (content) => {
    //     const data = await httpService.get(professionEndpoint + content);
    //     return data;
    // },
    // update: async () => {
    //     const data = await httpService.get(professionEndpoint + id);
    //     return data;
    // },
    // delete: async (id) => {
    //     const data = await httpService.get(professionEndpoint + id);
    //     return data;
    // }
};

export default professionService;
