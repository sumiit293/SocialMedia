import { axiosRequest } from './../common/helper/hepler';

export const fetchAllPOstApi = async (token) => {
    return await axiosRequest("GET", "/api/post", null, token);
}