import { axiosRequest } from './../helper/hepler';

export const addCommentApi = async (value, token) => {
    return await axiosRequest("POST", "/api/post/comment", value, token)
}

export const getCommentApi = async (id, token) => {
    return await axiosRequest("GET", `/api/post/comments/${id}`, null, token)
}

export const addReplyToCommentApi = async (value, token) => {
    return await axiosRequest("POST", "/api/comment/reply-comment", value, token);
}

export const getReplyToCommentApi = async (id, token) => {
    return await axiosRequest("GET", `/api/reply/${id}`, null, token);
}

export const deleteCommentApi = async (value, token) => {
    return await axiosRequest("POST", `/api/comment/delete`, value, token);
}

export const deleteReplyApi = async (value, token) => {
    return await axiosRequest("POST", "/api/comment/delete-reply", value, token);
}