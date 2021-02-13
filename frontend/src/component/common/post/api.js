import { axiosRequest } from './../helper/hepler';

const createPostApi = async (value, token) => {
    return await axiosRequest("POST", "/api/post", value, token)
}

export const LikeUnlikeApi = async (value, token) => {
    return await axiosRequest("POST", "/api/post/like", value, token)
}

export default createPostApi;