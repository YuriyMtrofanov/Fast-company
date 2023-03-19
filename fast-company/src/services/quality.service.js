import httpService from "./http.service";

const qualityEndpoint = "quality/";
const qualityService = {
    get: async () => {
        const request = await httpService.get(qualityEndpoint);
        return request.data;
    }
    // get: async (id, content) => {
    //     const data = await httpService.get(qualityEndpoint + id, content);
    //     return data;
    // },
    // create: async (content) => {
    //     const data = await httpService.get(qualityEndpoint + content);
    //     return data;
    // },
    // update: async () => {
    //     const data = await httpService.get(qualityEndpoint + id);
    //     return data;
    // },
    // delete: async (id) => {
    //     const data = await httpService.get(qualityEndpoint + id);
    //     return data;
    // }
};

export default qualityService;
