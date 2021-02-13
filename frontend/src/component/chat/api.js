import { axiosRequest } from './../common/helper/hepler';

export const fetchFriendListApi = async (token) => {
    return axiosRequest("GET", "/api/friend-list", null, token);
}

export const fetchIndividualInfoForChat = async (id, token) => {
    return axiosRequest("GET", `/api/get-brief-info/${id}`, null, token);
}